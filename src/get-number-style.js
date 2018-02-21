import getNumber from './get-number';

/**
 * Retrieve the computed style for an element, parsed as a float.
 * @param {Element} element Element to get style for.
 * @param {string} style Style property.
 * @param {CSSStyleDeclaration} [styles] Optionally include clean styles to
 *     use instead of asking for them again.
 * @return {number} The parsed computed value or zero if that fails because IE
 *     will return 'auto' when the element doesn't have margins instead of
 *     the computed style.
 */
export default function getNumberStyle(
  element, style,
  styles = window.getComputedStyle(element, null),
) {
  let value = getNumber(styles[style]);

  const el = document.body || document.documentElement;

  const e = document.createElement('div');
  e.style.cssText = 'width:10px;padding:2px;box-sizing:border-box;';
  el.appendChild(e);

  const { width } = window.getComputedStyle(e, null);
  const COMPUTED_SIZE_INCLUDES_PADDING = width === '10px';

  el.removeChild(e);

  // Support IE<=11 and W3C spec.
  if (!COMPUTED_SIZE_INCLUDES_PADDING && style === 'width') {
    value += getNumber(styles.paddingLeft) +
      getNumber(styles.paddingRight) +
      getNumber(styles.borderLeftWidth) +
      getNumber(styles.borderRightWidth);
  } else if (!COMPUTED_SIZE_INCLUDES_PADDING && style === 'height') {
    value += getNumber(styles.paddingTop) +
      getNumber(styles.paddingBottom) +
      getNumber(styles.borderTopWidth) +
      getNumber(styles.borderBottomWidth);
  }

  return value;
}
