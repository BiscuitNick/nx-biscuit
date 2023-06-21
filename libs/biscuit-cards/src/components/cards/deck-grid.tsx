import { CharCard } from "./char-card";
import {
  standardRanks,
  standardSuitChars,
  standardSuitColors,
} from "../../lib/constants";
import { getDeck } from "@/lib/deck";

const unshuffledDeck = getDeck(1);

interface DeckGridProps {
  deck: number[];
}

export const DeckGrid = (props: DeckGridProps) => {
  const { deck } = props;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "2em ".repeat(13),
        gridTemplateColumns: "2em ".repeat(4),
        gridAutoFlow: "column",
        gridGap: 0,
        width: "min-content",
        // background: "orange",
        // margin: "auto",
      }}
    >
      {unshuffledDeck.map((raw, i) =>
        deck.includes(raw) ? (
          <CharCard key={i} raw={raw} />
        ) : (
          <span key={i} style={{ margin: "auto" }}>
            -
          </span>
        )
      )}
    </div>
  );
};

export const MultiDeckGrid = (props: DeckGridProps) => {
  const { deck } = props;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "2em ".repeat(14),
        gridTemplateColumns: "2em ".repeat(5),
        gridAutoFlow: "column",
        gridGap: 0,
        width: "min-content",
        // background: "orange",
        // margin: "auto",
      }}
    >
      <span></span>
      {standardRanks.map((rank) => (
        <span key={rank} style={{ margin: "auto", fontWeight: "bold" }}>
          {rank}
        </span>
      ))}
      <span
        style={{
          gridArea: "1/2/2/3",
          margin: "auto",
          color: standardSuitColors[0],
        }}
      >
        {standardSuitChars[0]}
      </span>
      <span
        style={{
          gridArea: "1/3/2/4",
          margin: "auto",
          color: standardSuitColors[1],
        }}
      >
        {standardSuitChars[1]}
      </span>
      <span
        style={{
          gridArea: "1/4/2/5",
          margin: "auto",
          color: standardSuitColors[2],
        }}
      >
        {standardSuitChars[2]}
      </span>
      <span
        style={{
          gridArea: "1/5/2/6",
          margin: "auto",
          color: standardSuitColors[3],
        }}
      >
        {standardSuitChars[3]}
      </span>

      {unshuffledDeck.map((raw, i) => {
        const count = deck.filter((x) => x === raw).length;
        return (
          <span key={i} style={{ margin: "auto" }}>
            {count > 0 ? count : "-"}
          </span>
        );
      })}
    </div>
  );
};
