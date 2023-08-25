const [, UTCString] = new Date().toUTCString().split(',');

export const TimeStamp = () => {
  return (
    <div
      style={{
        paddingTop: 100,
        width: '100%',
        display: 'grid',
        textAlign: 'center',
      }}
    >
      Page Created {UTCString}
    </div>
  );
};
