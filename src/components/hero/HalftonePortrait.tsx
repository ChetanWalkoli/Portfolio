import styles from "./HalftonePortrait.module.scss";

const PORTRAIT_WEBP = "/portraits/chetan-halftone.webp";
const PORTRAIT_PNG = "/portraits/chetan-halftone.png";

export function HalftonePortrait() {
  return (
    <div className={styles.wrap} data-hero-portrait>
      <div className={styles.ambientRim} aria-hidden="true" />
      <picture className={styles.picture}>
        <source srcSet={PORTRAIT_WEBP} type="image/webp" />
        <img
          src={PORTRAIT_PNG}
          alt="Monochrome editorial halftone portrait of Chetan Walkoli"
          className={styles.portrait}
          width={1200}
          height={1416}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>
    </div>
  );
}
