import {Color, ColorOpacity} from '../../design/color';

export function convertColorToBackgroundClasses(
  color: Color,
  colorOpacity = ColorOpacity.Default
): Record<string, boolean> {
  return {
    'bg-primary': color === Color.Primary,
    'bg-secondary': color === Color.Secondary,
    'bg-success': color === Color.Success,
    'bg-warning': color === Color.Warning,
    'bg-error': color === Color.Error,
    'bg-black': color === Color.Black,
    'bg-white': color === Color.White,
  };
}
