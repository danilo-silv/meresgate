const Images = [
  { image: require('../../assets/dog-map-1.png') },
  { image: require('../../assets/dog-map-2.png') },
  { image: require('../../assets/dog-map-3.png') },
  { image: require('../../assets/dog-map-4.png') },
  { image: require('../../assets/dog-map-5.png') }
]

export const markers = [
  {
    coordinate: {
      latitude: -23.574393,
      longitude: -46.675465
    },
    address: 'R. Casa do Ator, 275',
    distance: 'Distance (5km)',
    image: Images[0].image
  },
  {
    coordinate: {
      latitude: -23.583513,
      longitude: -46.674182
    },
    address: 'R. Gomes de Carvalho, 124',
    distance: 'Distance (7km)',
    image: Images[1].image
  },
  {
    coordinate: {
      latitude: -23.587343,
      longitude: -46.668902
    },
    address: 'R. Quatá, 166',
    distance: 'Distance (10km)',
    image: Images[2].image
  },
  {
    coordinate: {
      latitude: -23.592259,
      longitude: -46.682804
    },
    address: 'R. Baluarte, 711',
    distance: 'Distance (8km)',
    image: Images[3].image
  },
  {
    coordinate: {
      latitude: -23.600601,
      longitude: -46.672426
    },
    address: 'R. Baluarte, 711',
    distance: 'Distance (8km)',
    image: Images[4].image
  }
]
