interface Props {
  strapline?: string
  title: string
}

export const SocialCardImageOverlay = ({ title }: Props) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      background: "transparent",
      width: "1200px",
      height: "100%",
      textWrap: "pretty",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "630px",
        padding: "3% 3%",
        width: "100%",
      }}
    >
      <h1
        style={{
          display: "block",
          margin: "0",
        }}
      >
        <span
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            color: "white",
            padding: "4px 15px",
            fontSize: "55px",
            fontWeight: "600",
            lineClamp: "3",
          }}
        >
          {title}
        </span>
      </h1>
      <div style={{ display: "block", flexGrow: "1" }} />
      <h2
        style={{
          margin: "0",
        }}
      >
        <span
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            color: "white",
            fontSize: "30px",
            fontWeight: "600",
            alignItems: "center",
            padding: "4px 15px",
          }}
        >
          blog.yuo.be
        </span>
      </h2>
    </div>
  </div>
)
