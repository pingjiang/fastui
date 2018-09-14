import ColorScheme from 'color-scheme';

export const SET_DEFAULT = `VOID
Road
Sidewalk
Parking
Rail Track
Person
Rider
Car
Truck
Bus
On Rails
Motorcycle
Bicycle
Caravan
Trailer
Building
Wall
Fence
Guard Rail
Bridge
Tunnel
Pole
Pole Group
Traffic Sign
Traffic Light
Vegetation
Terrain
Sky
Ground
Dynamic
Static`.split('\n');

export function computeTextColor(hexcolor) {
  const r = parseInt(hexcolor.substr(1, 2), 16);
  const g = parseInt(hexcolor.substr(3, 2), 16);
  const b = parseInt(hexcolor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

export function generateColors(names) {
  const scheme = new ColorScheme();

  scheme
    .from_hue(0)
    .scheme('tetrade')
    .variation('soft');
  let colors = scheme.colors();

  scheme
    .from_hue(10)
    .scheme('tetrade')
    .variation('pastel');
  colors.push(...scheme.colors());

  scheme
    .from_hue(20)
    .scheme('tetrade')
    .variation('hard');
  colors.push(...scheme.colors());

  scheme
    .from_hue(30)
    .scheme('tetrade')
    .variation('hard');
  colors.push(...scheme.colors());

  scheme
    .from_hue(40)
    .scheme('tetrade')
    .variation('hard');
  colors.push(...scheme.colors());

  colors = colors.map(c => '#' + c);

  return [
    {
      name: 'red',
      bgcolor: 'red',
      color: 'white',
    },
    {
      name: 'green',
      bgcolor: 'green',
      color: 'white',
    },
    {
      name: 'blue',
      bgcolor: 'blue',
      color: 'white',
    },
  ];

  return (names || SET_DEFAULT).map((v, i) => ({
    name: v,
    bgcolor: colors[i],
    color: computeTextColor(colors[i]),
  }));
}
