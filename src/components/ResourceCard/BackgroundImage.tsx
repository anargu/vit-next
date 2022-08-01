
export type BackgroundImageProps = {
  src : string,
  alt : string,
};

export const BackgroundImage = (props : BackgroundImageProps) => (
  <div
    role="img"
    alt={props.alt}
    className={`w-full h-full bg-contain bg-no-repeat`}
    style={{ backgroundImage: `url(${props.src})`}}
  />
);
