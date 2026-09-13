import React from 'react'

const FooterComponent = () => {
  return (
	<div> {/* Footer */}
	<footer style={{
    // position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",

    background: "#222",
    color: "white",
    textAlign: "center",
    padding: "15px",

    zIndex: 1000
}}>
    <p>©2026 ShopTech. All Rights Reserved.</p>
</footer>
	</div>
  )
}

export default FooterComponent