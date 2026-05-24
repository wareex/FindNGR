// Nigerian state coordinates (approximate centres)
export const NIGERIA_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue',
  'Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja',
  'Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara',
  'Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers',
  'Sokoto','Taraba','Yobe','Zamfara'
]

export const STATE_COORDS = {
  'Abia': [5.4527, 7.5248],
  'Adamawa': [9.3265, 12.3984],
  'Akwa Ibom': [4.9057, 7.8537],
  'Anambra': [6.2209, 7.0670],
  'Bauchi': [10.3158, 9.8442],
  'Bayelsa': [4.7719, 6.0699],
  'Benue': [7.3369, 8.7400],
  'Borno': [11.8333, 13.1500],
  'Cross River': [5.8702, 8.5988],
  'Delta': [5.5350, 5.9832],
  'Ebonyi': [6.2649, 8.0137],
  'Edo': [6.3350, 5.6037],
  'Ekiti': [7.7190, 5.3110],
  'Enugu': [6.4584, 7.5464],
  'FCT - Abuja': [9.0765, 7.3986],
  'Gombe': [10.2897, 11.1673],
  'Imo': [5.5720, 7.0588],
  'Jigawa': [12.2280, 9.5616],
  'Kaduna': [10.5264, 7.4379],
  'Kano': [12.0022, 8.5919],
  'Katsina': [12.9816, 7.6018],
  'Kebbi': [12.4539, 4.1975],
  'Kogi': [7.7337, 6.6906],
  'Kwara': [8.9669, 4.5874],
  'Lagos': [6.5244, 3.3792],
  'Nasarawa': [8.5390, 8.3247],
  'Niger': [9.9309, 5.5983],
  'Ogun': [7.1604, 3.3495],
  'Ondo': [7.2522, 5.1955],
  'Osun': [7.5629, 4.5624],
  'Oyo': [7.8500, 3.9300],
  'Plateau': [9.2182, 9.5179],
  'Rivers': [4.8396, 6.9112],
  'Sokoto': [13.0059, 5.2476],
  'Taraba': [8.8940, 11.3597],
  'Yobe': [12.2939, 11.4390],
  'Zamfara': [12.1222, 6.2236],
}

/**
 * Fetch nearest police stations for a given state using Overpass API (OpenStreetMap).
 * Falls back to a curated list of known Nigeria Police commands if API fails.
 */
export async function fetchPoliceStations(state, lga = '') {
  const coords = STATE_COORDS[state]
  if (!coords) return getFallbackStations(state)

  const [lat, lon] = coords
  const radius = 50000 // 50km radius

  const query = `
    [out:json][timeout:15];
    (
      node["amenity"="police"](around:${radius},${lat},${lon});
      way["amenity"="police"](around:${radius},${lat},${lon});
    );
    out center 20;
  `

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`,
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) throw new Error('Overpass API error')
    const data = await res.json()

    const stations = data.elements
      .filter(el => el.tags)
      .map(el => {
        const name = el.tags.name || el.tags['name:en'] || 'Police Station'
        const street = el.tags['addr:street'] || ''
        const area = el.tags['addr:city'] || el.tags['addr:suburb'] || el.tags['is_in'] || lga || state
        const phone = el.tags.phone || el.tags['contact:phone'] || ''
        const elLat = el.lat || el.center?.lat
        const elLon = el.lon || el.center?.lon
        const dist = elLat && elLon
          ? Math.round(haversine(lat, lon, elLat, elLon))
          : null
        return { name, address: [street, area].filter(Boolean).join(', '), phone, dist, lat: elLat, lon: elLon }
      })
      .filter(s => s.name.toLowerCase().includes('police') || s.name.toLowerCase().includes('station') || true)
      .sort((a, b) => (a.dist ?? 999) - (b.dist ?? 999))
      .slice(0, 10)

    return stations.length > 0 ? stations : getFallbackStations(state)
  } catch (err) {
    console.warn('Overpass API failed, using fallback:', err.message)
    return getFallbackStations(state)
  }
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

// Curated fallback list of real Nigerian Police Commands per state
function getFallbackStations(state) {
  const fallbacks = {
    'Lagos': [
      { name: 'Lagos State Police Command', address: 'Ikeja, Lagos', phone: '08097741919' },
      { name: 'Panti Police Station', address: 'Yaba, Lagos', phone: '' },
      { name: 'Surulere Police Station', address: 'Surulere, Lagos', phone: '' },
      { name: 'Oshodi Police Station', address: 'Oshodi, Lagos', phone: '' },
      { name: 'Badagry Police Division', address: 'Badagry, Lagos', phone: '' },
    ],
    'FCT - Abuja': [
      { name: 'FCT Police Command HQ', address: 'Louis Edet House, Shehu Shagari Way, Abuja', phone: '09-2340780' },
      { name: 'Garki Police Station', address: 'Area 10, Garki, Abuja', phone: '' },
      { name: 'Wuse Police Station', address: 'Wuse Zone 5, Abuja', phone: '' },
      { name: 'Gwagwalada Police Division', address: 'Gwagwalada, FCT', phone: '' },
      { name: 'Lugbe Police Station', address: 'Lugbe, Airport Road, FCT', phone: '' },
    ],
    'Kano': [
      { name: 'Kano State Police Command', address: 'Bompai Road, Kano', phone: '' },
      { name: 'Bompai Police Division', address: 'Bompai, Kano', phone: '' },
      { name: 'Sabon Gari Police Station', address: 'Sabon Gari, Kano', phone: '' },
      { name: 'Yankaba Police Post', address: 'Yankaba, Kano', phone: '' },
    ],
    'Rivers': [
      { name: 'Rivers State Police Command', address: 'Moscow Road, Port Harcourt', phone: '' },
      { name: 'Mile 1 Police Station', address: 'Mile 1, Port Harcourt', phone: '' },
      { name: 'Rumuola Police Station', address: 'Rumuola, Port Harcourt', phone: '' },
      { name: 'Eleme Police Division', address: 'Eleme, Rivers State', phone: '' },
    ],
    'Oyo': [
      { name: 'Oyo State Police Command', address: 'Eleyele, Ibadan', phone: '' },
      { name: 'Iyaganku Police Station', address: 'Iyaganku, Ibadan', phone: '' },
      { name: 'Agodi Police Division', address: 'Agodi, Ibadan', phone: '' },
      { name: 'Sango-Oyo Police Station', address: 'Sango, Ibadan', phone: '' },
    ],
  }

  const known = fallbacks[state]
  if (known) return known

  // Generic fallback for other states
  return [
    { name: `${state} State Police Command`, address: `${state} State Headquarters`, phone: '112' },
    { name: `${state} Central Police Station`, address: `State Capital, ${state}`, phone: '' },
    { name: `${state} Police Divisional HQ`, address: `${state} State`, phone: '' },
  ]
}
