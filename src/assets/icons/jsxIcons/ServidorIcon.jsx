function ServidorIcon({style}) {
    if(style == null){
        style = [];
    }
    //{style.hasOwnProperty("color") ? style.color : "#000000"}
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={style.hasOwnProperty('size') ? style.size : 24}
      height={style.hasOwnProperty('size') ? style.size : 24}
      viewBox="0 0 24 24"
      fill={style.hasOwnProperty('color') ? style.color : "#000000"}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z" />
    </svg>
  );
}

export default ServidorIcon;
