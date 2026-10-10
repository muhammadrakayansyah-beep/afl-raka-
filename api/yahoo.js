const ALLOWED_RANGES = new Set(['1d']);
const ALLOWED_INTERVALS = new Set(['1m']);

module.exports = async function handler(req, res) {
  const symbol = typeof req.query.symbol === 'string' ? req.query.symbol : '';
  const range = typeof req.query.range === 'string' ? req.query.range : '';
  const interval = typeof req.query.interval === 'string' ? req.query.interval : '';

  if (!/^[A-Z0-9.-]{1,12}\.JK$/.test(symbol) ||
      !ALLOWED_RANGES.has(range) ||
      !ALLOWED_INTERVALS.has(interval)) {
    res.status(400).json({ error: 'Permintaan kuotasi tidak valid.' });
    return;
  }

  try {
    const upstream = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/' +
      encodeURIComponent(symbol) +
      '?range=1d&interval=1m&includePrePost=false',
      { headers: { Accept: 'application/json' } }
    );
    if (!upstream.ok) {
      res.status(502).json({ error: 'Yahoo Finance merespons HTTP ' + upstream.status + '.' });
      return;
    }
    const data = await upstream.json();
    if (data.chart && data.chart.error) {
      res.status(502).json({ error: 'Yahoo Finance tidak menyediakan kuotasi untuk simbol ini.' });
      return;
    }
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=30');
    res.status(200).json(data);
  } catch (error) {
    console.error('Yahoo Finance request failed:', error.message);
    res.status(502).json({ error: 'Tidak dapat mengambil kuotasi Yahoo Finance.' });
  }
};
