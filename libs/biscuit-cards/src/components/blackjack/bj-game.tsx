import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import { getBlackJackHandTotal } from '../../lib/getRank'; //getBlackJackRanks

import { BlackjackPlayer, BlackjackPlayerProps } from './bj-player';
import { BlackjackDealer } from './bj-dealer';
import { rules } from './bj-constants'; //, dummyPlayerData, dummyPlayers
import { shuffledDeck } from '../../lib/deck';
import { sleep } from './helpers';

import '../../Blackjack.css';
// import '../../../index.css';

const resetPlayerValues = {
  isFinished: false,
  isBusted: false,
  isDoubled: false,
  isBlackjack: false,
  isSplit: false,
  isSettled: false,
  isInsured: null,
  result: '',
};

const getHandTotal = (cards: { raw: number }[]) => {
  const raws = cards.map((c) => c.raw);
  return getBlackJackHandTotal(raws);
};

interface playersType {
  [key: string]: BlackjackPlayerProps;
}

interface BlackjackGameProps {
  decks?: number;
  minBet?: number;
  maxBet?: number;
  maxSplits?: number;
  maxPlayers?: number;
  blackjackPayout?: number;
  minRemaingCardsBeforeShuffle?: number;
  delay?: 250;
}

// interface GameStatus {
//   enum:
// }

export const BjGame = (props: BlackjackGameProps) => {
  // const [availableWidth, setAvailableWidth] = useState(500);

  const {
    decks = rules.decks,
    minBet = rules.minBet,
    // maxBet = rules.maxBet,
    maxSplits = rules.maxSplits,
    // maxPlayers = rules.maxPlayers,
    // blackjackPayout = rules.blackjackPayout,
    minRemaingCardsBeforeShuffle = rules.minRemaingCardsBeforeShuffle,
    delay = rules.delay,
  } = props;

  const autoDeal = false;

  const [playCardSound] = useSound('/sounds/carddrop.mp3');
  // const [playShuffleSound] = useSound("/sounds/shuffle.mp3");
  const [playFlipSound] = useSound('/sounds/cardflip.mp3');

  const [deck, setDeck] = useState<number[]>([
    // 10,
    // 0,
    // 0,
    ...shuffledDeck(decks),
  ]);
  const [dealerCards, setDealer] = useState<any>([
    // { raw: Math.floor(Math.random() * 52), show: true, exit: false },
  ]);
  const [players, setPlayers] = useState<playersType>({
    player1: {
      hands: [
        {
          cards: [],
          bets: {
            bet: 25,
            doubleBet: 0,
            insuranceBet: 0,
            amountWon: 0,
            amountLost: 0,
          },
          isFinished: false,
          isBusted: false,
          isDoubled: false,
          isBlackjack: false,
          isSplit: false,
          isSettled: false,
          isInsured: null,
          result: '',
        },
      ],
      handIndex: 0,
      bank: 975,
      sittingOut: false,
    },
    // player2: {
    //   hands: [
    //     {
    //       cards: [],
    //       bets: {
    //         bet: 0,
    //         doubleBet: 0,
    //         insuranceBet: 0,
    //         amountWon: 0,
    //         amountLost: 0,
    //       },
    //       isFinished: false,
    //       isBusted: false,
    //       isDoubled: false,
    //       isBlackjack: false,
    //       isSplit: false,
    //       isSettled: false,
    //       isInsured: null,
    //       result: "",
    //     },
    //   ],
    //   handIndex: 0,
    //   bank: 1000,
    //   sittingOut: false,
    // },
  });
  const [gameStatus, setGameStatus] = useState('pendingNewGame'); //pendingNewGame | playersTurn
  const [playerDecision, setPlayerDecision] = useState('processing');
  const [playerIndex, setPlayerIndex] = useState(0);
  const playerIds = Object.keys(players);
  const activePlayers = playerIds.filter((id) => !players[id].sittingOut);
  const activePlayerId = activePlayers[playerIndex];
  const activePlayer = players[activePlayerId];

  const handleBet = (bet: number, playerId: string) => {
    if (gameStatus === 'placeBets' || gameStatus === 'pendingNewGame') {
      const player = players[playerId];
      player.hands[0].bets.bet += bet;
      player.bank -= bet;
      setPlayers({ ...players, [playerId]: player });
    } else if (gameStatus === 'collectBets') {
      const player = players[playerId];
      let bank = player.bank;

      let totalWon = 0;
      let totalLost = 0;

      const hands = player.hands.map((hand, i) => {
        const { bets } = hand;
        bank += bets.amountWon;
        bank += bets.doubleBet;
        bank += bets.insuranceBet;

        totalWon += bets.amountWon;
        totalLost += bets.amountLost;

        bets.amountWon = 0;
        bets.amountLost = 0;

        bets.doubleBet = 0;
        bets.insuranceBet = 0;

        if (i !== 0) {
          bank += bets.bet;
          bets.bet = 0;
        }
        return { ...hand, bets, result: '' };
      });

      console.log('Net', totalWon - totalLost);

      setPlayers({
        ...players,
        [playerId]: { ...player, bank, hands, handIndex: 0 },
      });
    }
  };

  const handleInsurance = (purchaseInsurance: boolean, playerId: string) => {
    const player = players[playerId];
    const hand = player.hands[0];
    hand.isInsured = purchaseInsurance;
    hand.bets.insuranceBet = purchaseInsurance ? hand.bets.bet / 2 : 0;
    player.hands[0] = hand;
    setPlayers({ ...players, [playerId]: player });
  };

  // useEffect(() => {
  //   setAvailableWidth(window.innerWidth);
  // }, []);

  useEffect(() => {
    async function placeBets() {
      setGameStatus(autoDeal ? 'start' : 'pendingNewGame');
    }

    async function preDeal() {
      // console.log("preDeal");
      const playersCopy = { ...players };
      playerIds.map((id) => {
        const player = { ...players[id] };
        const bet = player.hands[0].bets.bet;
        player.sittingOut = bet < minBet;
        playersCopy[id] = player;
      });
      setPlayers(playersCopy);
      setGameStatus('start');
    }

    async function start() {
      // console.log(205, "start()");
      if (deck.length < minRemaingCardsBeforeShuffle) {
        setGameStatus('shuffling');
      } else {
        await sleep(delay);
        setGameStatus('deal');
      }
    }

    async function shuffling() {
      // console.log(215, "shuffling()");
      // TODO: Need better shuffling sound
      const newDeck = shuffledDeck(decks);
      setDeck(newDeck);

      await sleep(delay * 5);
      setGameStatus('deal');
    }

    async function deal() {
      // console.log(225, "deal()");
      await sleep(delay);

      // const playerCards = playerIds
      //   .map((id) => players[id].hands[0].cards)
      //   .flat();

      const playerCards = activePlayers
        .map((id) => players[id].hands[0].cards)
        .flat();

      // const hands = playerIds.length + 1;
      const hands = activePlayers.length + 1;

      const dealtCards = playerCards.length + dealerCards.length;
      const dealIndex = dealtCards % hands;

      if (dealtCards < hands * 2) {
        const _deck = [...deck];
        const card = _deck[0];

        const remainingDeck = _deck.splice(1);
        playCardSound();
        setDeck(remainingDeck);

        if (dealIndex === 0) {
          // Deal to dealer
          setDealer([
            ...dealerCards,
            { raw: card, show: dealtCards !== 0, exit: false },
          ]);
        } else {
          // Deal to players
          const playerIndex = dealIndex - 1;
          // const playerId = playerIds[playerIndex];
          const playerId = activePlayers[playerIndex];

          const player = players[playerId];
          player.hands[0].cards.push({ raw: card, show: true, exit: false });
          setPlayers({ ...players, [playerId]: player });
        }
      } else {
        const dealerAce = dealerCards[1].raw % 13 === 0;
        const dealerTen = dealerCards[1].raw % 13 >= 9;
        if (dealerAce) {
          setGameStatus('offerInsurance');
        } else if (dealerTen) {
          setGameStatus('dealerBlackJackCheck');
        } else {
          setGameStatus('playersTurn');
        }
      }
    }

    async function offerInsurance() {
      const playerHands = activePlayers.map((id) => players[id].hands[0]);

      const allPlayersOfferedInsurance = playerHands.every(
        (hand) => hand.isInsured !== null
      );

      if (allPlayersOfferedInsurance) {
        setGameStatus('dealerBlackJackCheck');
      }
      // const allPlayersSettled = playerHands
      //   .every((hand) => hand.isSettled);
      // if (allPlayersSettled) {
      //   setGameStatus("collectBets");
      // } else {
      //   // Payout bets 1 at a time...
      // }
    }

    async function dealerBlackJackCheck() {
      await sleep(delay);

      const dealerBlackjack =
        getBlackJackHandTotal(
          dealerCards.map((x: { raw: number }) => x.raw)
        ) === 21;

      if (dealerBlackjack) {
        setGameStatus('dealerSequence');
      } else {
        setGameStatus('playersTurn');
      }
    }

    async function dealerSequence() {
      await sleep(delay * 2);
      const dealerHand = [...dealerCards];
      const dealerHoleHidden = dealerHand[0].show === false;
      if (dealerHoleHidden) {
        dealerHand[0].show = true;
        playFlipSound();
        await sleep(delay);
        setDealer(dealerHand);
        return;
      } else {
        const dealerTotal = getBlackJackHandTotal(dealerHand.map((x) => x.raw));

        if (dealerTotal < 17) {
          const _deck = [...deck];
          const card = _deck[0];

          const remainingDeck = _deck.splice(1);
          playCardSound();
          setDeck(remainingDeck);
          setDealer([...dealerHand, { raw: card, show: true, exit: false }]);
        } else {
          // console.log(315, dealerHand, dealerTotal);
          setGameStatus('settleBets');
        }
      }
    }

    async function settleBets() {
      await sleep(delay * 2);

      const playerHands = activePlayers.map((id) => players[id].hands);
      const allPlayersSettled = playerHands
        .flat()
        .every((hand) => hand.isSettled);

      if (allPlayersSettled) {
        const playersCopy = { ...players };
        activePlayers.forEach((id) => {
          players[id].handIndex = 0;
        });
        setPlayers(playersCopy);
        setPlayerIndex(0);
        setGameStatus('collectBets');
      } else {
        const player = { ...activePlayer };
        const hands = [...player.hands];
        const hand = { ...hands[player.handIndex] };
        const bets = { ...hand.bets };
        const cards = [...hand.cards];

        const { isSettled, isInsured, isBlackjack, isBusted } = hand;

        if (isSettled) {
          if (player.handIndex + 1 < hands.length) {
            player.handIndex += 1;
            setPlayers({ ...players, [activePlayerId]: player });
          } else {
            player.handIndex = 0;
            setPlayers({ ...players, [activePlayerId]: player });
            setPlayerIndex((playerIndex + 1) % activePlayers.length);
          }
        } else {
          const playerTotal = getHandTotal(cards);
          const dealerTotal = getHandTotal(dealerCards);
          const dealerBusted = dealerTotal > 21;
          const dealerBlackjack =
            dealerTotal === 21 && dealerCards.length === 2;

          let result = '';

          if (dealerBlackjack) {
            if (isInsured) {
              if (isBlackjack) {
                bets.amountWon = bets.insuranceBet * 2;
                result = 'win';
              } else {
                // Player wins insurance bet, loses original bet --> Net result is a push.
                bets.amountWon = bets.insuranceBet * 2;
                bets.amountLost = bets.bet;
                bets.bet = 0;
                result = 'push';
              }
            } else {
              if (isBlackjack) {
                result = 'push';
              } else {
                bets.amountLost = bets.bet;
                bets.bet = 0;
                result = 'lose';
              }
            }
          }
          // Dealer does not have blackjack
          else {
            // Insurance bet is lost (if wagered)
            bets.amountLost += bets.insuranceBet;
            bets.insuranceBet = 0;
            if (isBlackjack) {
              bets.amountWon += bets.bet * rules.blackjackPayout;
              result = 'Blackjack - Win';
            } else if (isBusted) {
              bets.amountLost += bets.bet + bets.doubleBet;
              bets.bet = 0;
              bets.doubleBet = 0;
              result = `Player Busts ${playerTotal} - Lose`;
            } else if (dealerBusted) {
              bets.amountWon += bets.bet + bets.doubleBet;
              result = `Dealer Busts ${dealerTotal} - Win`;
            } else if (playerTotal > dealerTotal) {
              bets.amountWon += bets.bet + bets.doubleBet;
              result = `Dealer ${dealerTotal} Player ${playerTotal} - Win`;
            } else if (playerTotal < dealerTotal) {
              bets.amountLost += bets.bet + bets.doubleBet;
              bets.bet = 0;
              bets.doubleBet = 0;
              result = `Dealer ${dealerTotal} Player ${playerTotal} - Lose`;
            } else if (playerTotal === dealerTotal) {
              result = `Dealer ${dealerTotal} Player ${playerTotal} - Push`;
            } else {
              result = `Dealer ${dealerTotal} Player ${playerTotal} - ERROR`;
              console.log(406, 'error', playerTotal, dealerTotal);
            }

            // Push if isBlackjack &&  !isInsured
            // Push if !isBlackjack && isInsured
            // Win if isBlackjack && isInsured
            // Lose if !isBlackjack && !isInsured
          }

          hand.result = result;
          hand.isSettled = true;
          hand.bets = bets;
          hands[player.handIndex] = hand;
          player.hands = hands;

          console.log('dealer', dealerTotal, dealerBlackjack, dealerBusted);
          console.log('player', playerTotal, isBlackjack, isBusted);
          // console.log(result);

          setPlayers({ ...players, [activePlayerId]: player });
        }
      }
    }

    async function collectBets() {
      const playerHands = playerIds.map((id) => players[id].hands);
      const allPlayersSettled = playerHands
        .flat()
        .every((hand) => hand.result === '');
      if (allPlayersSettled) {
        setGameStatus('exitHands');
      } else {
        // Payout bets 1 at a time...
        // Clearcards after bet is settled
      }
    }

    async function exitHands() {
      // console.log(439, "exitHands()");
      const dealerHand = dealerCards.map((card: any) => ({
        ...card,
        exit: true,
      }));

      setDealer(dealerHand);
      setGameStatus('clearHands');
      await sleep(delay);
    }

    async function clearHands() {
      // console.log(451, "clearingHands()");
      await sleep(delay);

      // const playersCopy = { ...players };
      const playersCopy: any = {};

      playerIds.forEach((id) => {
        const player = { ...players[id] };
        const bets = { ...player.hands[0].bets };
        const hands = [
          {
            cards: [],
            bets,
            ...resetPlayerValues,
          },
        ];
        player.hands = hands;

        playersCopy[id] = player;
      });

      setPlayers({ ...players, ...playersCopy });
      setDealer([]);
      await sleep(delay);
      setGameStatus('placeBets');
    }

    if (gameStatus === 'pendingNewGame') {
      // TODO do we need this ?
    } else if (gameStatus === 'preDeal') {
      preDeal();
    } else if (gameStatus === 'start') {
      start();
    } else if (gameStatus === 'shuffling') {
      shuffling();
    } else if (gameStatus === 'deal') {
      deal();
    } else if (gameStatus === 'offerInsurance') {
      offerInsurance();
    } else if (gameStatus === 'dealerBlackJackCheck') {
      dealerBlackJackCheck();
    } else if (gameStatus === 'dealerSequence') {
      dealerSequence();
    } else if (gameStatus === 'settleBets') {
      settleBets();
    } else if (gameStatus === 'collectBets') {
      collectBets();
    } else if (gameStatus === 'exitHands') {
      exitHands();
    } else if (gameStatus === 'clearHands') {
      clearHands();
    } else if (gameStatus === 'placeBets') {
      placeBets();
    }
  }, [gameStatus, players, dealerCards]);

  useEffect(() => {
    async function processPlayerDecision() {
      // console.log("processPlayerDecision()");

      await sleep(delay);

      const player = { ...activePlayer };
      const hands = [...player.hands];
      const hand = { ...hands[player.handIndex] };
      const cards = [...hand.cards];

      const total = getHandTotal(cards);

      hand.isBusted = total > 21;
      hand.isBlackjack =
        hands.length === 1 && cards.length === 2 && total === 21;
      hand.isFinished =
        hand.isFinished ||
        hand.isBlackjack ||
        hand.isDoubled ||
        hand.isBusted ||
        total === 21;

      hands[player.handIndex] = hand;
      player.hands = hands;

      if (cards.length === 1) {
        // console.log(529, "autoHit split hand");
        await sleep(delay);
        playerHit();
      } else if (hand.isFinished) {
        if (player.handIndex + 1 < hands.length) {
          player.handIndex += 1;
          setPlayers({ ...players, [activePlayerId]: player });
        } else {
          player.handIndex = 0;
          setPlayers({ ...players, [activePlayerId]: player });
          setPlayerIndex((playerIndex + 1) % activePlayers.length);
        }
      } else {
        setPlayers({ ...players, [activePlayerId]: player });
        setPlayerDecision('pending');
      }
    }

    async function playerHit() {
      // console.log(552, "playerHit()");
      setPlayerDecision('hitting...');
      await sleep(delay);

      // Deep copy of player
      const player = { ...activePlayer };
      const hands = [...player.hands];
      const hand = { ...hands[player.handIndex] };
      const cards = [...hand.cards];

      // Add card to hand
      const _deck = [...deck];
      const card = _deck[0];
      const remainingDeck = _deck.splice(1);
      playCardSound();
      cards.push({ raw: card, show: true, exit: false });
      hands[player.handIndex] = { ...hand, cards };
      player.hands = hands;

      // Update player state
      setDeck(remainingDeck);
      setPlayers({ ...players, [activePlayerId]: player });
      setPlayerDecision('processing');

      // await sleep(delay);
    }

    async function playerDouble() {
      // console.log(590, "playerDouble()");
      setPlayerDecision('doubling...');
      await sleep(delay);

      // Deep copy of player
      const player = { ...activePlayer };
      const hands = [...player.hands];
      const hand = { ...hands[player.handIndex] };
      const bets = { ...hand.bets };
      const cards = [...hand.cards];

      // Add card to hand
      const _deck = [...deck];
      const card = _deck[0];
      const remainingDeck = _deck.splice(1);
      playCardSound();
      cards.push({ raw: card, show: true, exit: false });

      // Add Double Bet
      bets.doubleBet = bets.bet;

      player.bank -= hand.bets.bet;

      // Update hand with new cards and bets
      hands[player.handIndex] = {
        ...hand,
        cards,
        bets,
        isDoubled: true,
        // isFinished: true,
      };
      player.hands = hands;

      setDeck(remainingDeck);
      setPlayers({ ...players, [activePlayerId]: player });
      setPlayerDecision('processing');
      // await sleep(delay);
    }

    async function playerSplit() {
      // console.log(616, "playerSplit()");
      setPlayerDecision('splitting...');
      await sleep(delay);

      // Deep copy of player
      const player = { ...activePlayer };
      const hands = [...player.hands];
      const hand = { ...hands[player.handIndex] };
      const bets = { ...hand.bets };
      const cards = [...hand.cards];

      player.bank -= bets.bet;
      const splitHand = { ...hand, bets, cards: [cards[1]] };
      hands.push(splitHand);
      cards.splice(1);
      hands[player.handIndex] = { ...hand, cards };
      player.hands = hands;

      setPlayers({ ...players, [activePlayerId]: player });
      setPlayerDecision('processing');
      // await sleep(delay);
    }

    async function playerStand() {
      // console.log(639, "playerStand()");
      setPlayerDecision('standing...');
      await sleep(delay);

      const player = { ...activePlayer };
      const hands = [...player.hands];
      const hand = { ...hands[player.handIndex] };

      // Set isFinished to true for hand
      hands[player.handIndex] = { ...hand, isFinished: true };
      player.hands = hands;

      setPlayers({ ...players, [activePlayerId]: player });
      setPlayerDecision('processing');
      // await sleep(delay);
    }

    async function playersTurn() {
      if (playerDecision === 'processing') {
        const playerHands = activePlayers.map((id) => players[id].hands);
        const allHandsFinished = playerHands
          .flat()
          .every((hand) => hand.isFinished);

        if (allHandsFinished) {
          const playersCopy = { ...players };
          activePlayers.forEach((id) => {
            players[id].handIndex = 0;
          });

          setPlayers(playersCopy);
          setPlayerIndex(0);
          setGameStatus('dealerSequence');
        } else {
          processPlayerDecision();
        }
      } else if (playerDecision === 'hit') {
        playerHit();
      } else if (playerDecision === 'stand') {
        playerStand();
      } else if (playerDecision === 'double') {
        playerDouble();
      } else if (playerDecision === 'split') {
        playerSplit();
      } else if (playerDecision === 'pending') {
        // console.log(694, "playersTurn()", activePlayer, activePlayerId);
      }
    }

    if (gameStatus === 'playersTurn') {
      playersTurn();
    } else if (gameStatus === 'pendingNewGame') {
      if (playerDecision === 'ready') {
        setGameStatus('preDeal');
        setPlayerDecision('processing');
      }
    }
  }, [gameStatus, activePlayer, playerDecision]);

  return (
    <div className="blackjack-container">
      <BlackjackDealer cards={dealerCards} gameStatus={gameStatus} />
      {/* <div style={{ position: "absolute" }}>
        <div>{gameStatus}</div>
        <div>{playerDecision}</div>
      </div> */}
      <div
        style={{
          display: 'grid',
          direction: 'rtl',
          width: '100%',
          gridAutoFlow: 'column',
          // background: "pink",
          gridTemplateColumns: `repeat(${activePlayers.length}, 1fr)`,
          justifyContent: 'space-between',
        }}
      >
        {playerIds.map((id: string, i: number) => (
          <div
            key={i}
            style={{
              margin: 'auto',
            }}
          >
            <BlackjackPlayer
              {...players[id]}
              active={activePlayerId === id}
              gameStatus={gameStatus}
              maxSplits={maxSplits}
              playerDecision={playerDecision}
              setPlayerDecision={setPlayerDecision}
              playerId={id}
              handleBet={handleBet}
              handleInsurance={handleInsurance}
              minBet={minBet}
              // availableWidth={availableWidth / playerIds.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
