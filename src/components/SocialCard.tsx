interface Props {
  strapline?: string
  title: string
}

export const SocialCard = ({ strapline, title }: Props) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      background: "white",
      width: "1200px",
      height: "100%",
      textWrap: "pretty",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "520px",
        padding: "2% 5%",
        width: "100%",
      }}
    >
      <h1
        style={{
          display: "block",
          color: "black",
          fontSize: "80px",
          fontWeight: "600",
          lineClamp: "3",
        }}
      >
        {title}
      </h1>
      {strapline && (
        <div
          style={{
            display: "block",
            color: "black",
            fontSize: "30px",
            fontWeight: "500",
            lineClamp: "2",
          }}
        >
          {strapline}
        </div>
      )}
    </div>
    <div
      style={{
        display: "flex",
        background: "#2259ae",
        color: "white",
        height: "110px",
        fontSize: "40px",
        fontWeight: "600",
        alignItems: "center",
        padding: "0 5%",
      }}
    >
      blog.yuo.be
    </div>
  </div>
)
