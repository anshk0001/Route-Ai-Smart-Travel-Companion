// Route AI – trip management + AI planner (ES module, no dependencies)

const DESTINATIONS = [
  // ---------- Domestic ----------
  { id: 'goa', type: 'domestic', name: 'Goa', region: 'Goa, India', hue: 200, best: 'Nov – Feb', stay: '3–5 days', known: 'Beaches, nightlife, Portuguese-era old town',
    brief: 'India’s laid-back coastline. North Goa is lively with beach shacks and markets; the south is quieter, with wide empty sands.' },
  { id: 'manali', type: 'domestic', name: 'Manali', region: 'Himachal Pradesh, India', hue: 160, best: 'Mar – Jun, Dec – Jan', stay: '4–6 days', known: 'Snow, Solang Valley, Rohtang route',
    brief: 'A Himalayan valley town set among pine forests and rivers. A base for treks, snow sports and mountain road trips.' },
  { id: 'jaipur', type: 'domestic', name: 'Jaipur', region: 'Rajasthan, India', hue: 20, best: 'Oct – Mar', stay: '2–3 days', known: 'Amber Fort, City Palace, bazaars',
    brief: 'The Pink City mixes royal forts and palaces with busy bazaars. Compact enough to cover the highlights in a long weekend.' },
  { id: 'kerala', type: 'domestic', name: 'Kerala', region: 'Kerala, India', hue: 145, best: 'Sep – Mar', stay: '5–7 days', known: 'Backwaters, tea hills, Ayurveda',
    brief: 'Quiet houseboat backwaters, misty tea estates in Munnar and a long, palm-lined coast. Slow travel at its best.' },
  { id: 'ladakh', type: 'domestic', name: 'Ladakh', region: 'Ladakh, India', hue: 255, best: 'May – Sep', stay: '7–9 days', known: 'Pangong Lake, monasteries, high passes',
    brief: 'A high-altitude desert of stark mountains and deep blue lakes. Plan for acclimatisation days on arrival.' },
  { id: 'andaman', type: 'domestic', name: 'Andaman', region: 'Andaman & Nicobar, India', hue: 215, best: 'Oct – May', stay: '5–6 days', known: 'Clear water, diving, Havelock Island',
    brief: 'Island chain with clear water and coral reefs. Good for snorkelling, diving and quiet beaches.' },

  // ---------- International ----------
  { id: 'bali', type: 'international', name: 'Bali', region: 'Indonesia', hue: 150, best: 'Apr – Oct', stay: '5–7 days', known: 'Temples, rice terraces, surf',
    brief: 'Rice terraces and temples inland, surf and cliffside beaches on the coast. Ubud for culture, Uluwatu for sunsets.' },
  { id: 'dubai', type: 'international', name: 'Dubai', region: 'United Arab Emirates', hue: 70, best: 'Nov – Mar', stay: '3–5 days', known: 'Skyline, desert safaris, shopping',
    brief: 'A modern city of record-setting towers, large malls and desert excursions. Easy to reach from India with short flights.' },
  { id: 'singapore', type: 'international', name: 'Singapore', region: 'Singapore', hue: 185, best: 'Feb – Apr', stay: '3–4 days', known: 'Gardens, hawker food, clean transit',
    brief: 'A tidy island city with excellent public transport, green spaces and some of the best street food anywhere.' },
  { id: 'bangkok', type: 'international', name: 'Bangkok', region: 'Thailand', hue: 330, best: 'Nov – Feb', stay: '3–4 days', known: 'Street food, temples, river life',
    brief: 'A high-energy capital with ornate temples, floating markets and food on every corner. Often paired with Phuket or Krabi.' },
  { id: 'maldives', type: 'international', name: 'Maldives', region: 'Maldives', hue: 195, best: 'Nov – Apr', stay: '4–6 days', known: 'Overwater villas, lagoons, diving',
    brief: 'Private-island resorts surrounded by turquoise lagoons. Ideal for honeymoons and complete rest.' },
  { id: 'paris', type: 'international', name: 'Paris', region: 'France', hue: 290, best: 'Apr – Jun, Sep – Oct', stay: '4–5 days', known: 'Eiffel Tower, museums, cafés',
    brief: 'Walkable art and architecture, from the Louvre to Montmartre. Spring and early autumn avoid the biggest crowds.' },
];

// Photos from Wikimedia Commons (free to use). The coloured gradient stays as a fallback.
const W = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
const PHOTOS = {
  goa: W + '9/9c/Palolem_Beach%2C_South_Goa.jpg/960px-Palolem_Beach%2C_South_Goa.jpg',
  manali: W + 'f/f1/Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG/960px-Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG',
  jaipur: W + 'f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/960px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg',
  kerala: W + 'e/ee/House_Boat_DSW.jpg/960px-House_Boat_DSW.jpg',
  ladakh: W + '8/8d/Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg/960px-Road_Padum_Zanskar_Range_Jun24_A7CR_00818.jpg',
  andaman: W + '1/1f/Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg/960px-Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg',
  bali: W + '5/5d/Ubud_%2849818456887%29.jpg/960px-Ubud_%2849818456887%29.jpg',
  dubai: W + '9/90/Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg/960px-Burj_Khalifa_%28worlds_tallest_building%29_and_the_Dubai_skyline_%2825781049892%29.jpg',
  singapore: W + 'c/c7/Marina_Bay_Sands_%28I%29.jpg/960px-Marina_Bay_Sands_%28I%29.jpg',
  bangkok: W + '7/7d/4Y1A1159_Bangkok_%2833536795515%29.jpg/960px-4Y1A1159_Bangkok_%2833536795515%29.jpg',
  maldives: W + '5/53/Diamonds_Thudufushi_Beach_and_Water_Villas%2C_May_2017_-01.jpg/960px-Diamonds_Thudufushi_Beach_and_Water_Villas%2C_May_2017_-01.jpg',
  paris: W + '4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/960px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
};

const $ = (sel, root = document) => root.querySelector(sel);
const grid = $('#grid'), dlg = $('#dlg'), toast = $('#toast');
const STORE = 'routeai.trips.v1';
let current = 'domestic';
let active = null;

/* ---------- helpers ---------- */
// Run a DOM update inside a view transition when the browser supports it.
const transition = fn => document.startViewTransition ? document.startViewTransition(fn) : fn();

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' });
const fmtDate = v => v ? fmt.format(new Date(v)) : '';

const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) ?? []; } catch { return []; } };
const save = trips => { try { localStorage.setItem(STORE, JSON.stringify(trips)); } catch { /* storage blocked */ } };

let toastTimer;
const say = msg => {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
};

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- destinations ---------- */
function renderGrid() {
  grid.innerHTML = DESTINATIONS.filter(d => d.type === current).map(d => `
    <button class="card" data-id="${d.id}" style="--h:${d.hue}" aria-label="${esc(d.name)} – view brief">
      <div class="art"><img src="${PHOTOS[d.id]}" alt="" loading="lazy" decoding="async"><strong>${esc(d.name)}</strong><small>${esc(d.stay)}</small></div>
      <div class="info">
        <p>${esc(d.brief)}</p>
        <div class="meta"><span>${esc(d.region)}</span><span>Best: ${esc(d.best)}</span></div>
      </div>
    </button>`).join('');
}

document.querySelectorAll('.seg [role=tab]').forEach(tab =>
  tab.addEventListener('click', () => {
    if (tab.dataset.type === current) return;
    current = tab.dataset.type;
    transition(() => {
      document.querySelectorAll('.seg [role=tab]').forEach(t => t.setAttribute('aria-selected', t === tab));
      renderGrid();
    });
  }));

grid.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (!card) return;
  active = DESTINATIONS.find(d => d.id === card.dataset.id);
  $('#dTitle').textContent = active.name;
  $('#dRegion').textContent = active.region;
  $('#dBrief').textContent = active.brief;
  $('#dBest').textContent = active.best;
  $('#dStay').textContent = active.stay;
  $('#dKnown').textContent = active.known;
  dlg.style.setProperty('--h', active.hue);
  $('#dArt').style.backgroundImage = PHOTOS[active.id] ? `url("${PHOTOS[active.id]}")` : '';
  dlg.showModal();
});

$('#dClose').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); // click backdrop to close
$('#dPlan').addEventListener('click', () => {
  dlg.close();
  $('#to').value = active.name;
  $('#top').scrollIntoView({ behavior: 'smooth' });
  $('input[name=depart]').focus({ preventScroll: true });
  say(`Add dates to search your ${active.name} trip`);
});

/* ---------- trips ---------- */
const STATUS = ['Planning', 'Booked', 'Completed'];

function renderTrips() {
  const trips = load();
  $('#tripList').innerHTML = trips.map(t => `
    <li class="trip" data-id="${t.id}">
      <div class="grow">
        <div class="route">${esc(t.from)} → ${esc(t.to)}</div>
        <div class="when">${fmtDate(t.depart)}${t.ret ? ' – ' + fmtDate(t.ret) : ''} · ${esc(t.pax)}</div>
      </div>
      <span class="tag">${esc(t.kind)}</span>
      <select aria-label="Trip status">${STATUS.map(s => `<option${s === t.status ? ' selected' : ''}>${s}</option>`).join('')}</select>
      <button class="del" type="button" aria-label="Remove trip">✕</button>
    </li>`).join('');
  $('#clear').hidden = trips.length === 0;
}

$('#searchForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.currentTarget));
  if (f.ret && f.ret < f.depart) return say('Return date must be after the departure date');
  const trips = load();
  trips.unshift({ id: crypto.randomUUID(), status: 'Planning', ...f });
  save(trips);
  transition(renderTrips);
  say('Trip saved to My trips');
  $('#trips').scrollIntoView({ behavior: 'smooth' });
});

$('#tripList').addEventListener('click', e => {
  if (!e.target.closest('.del')) return;
  const id = e.target.closest('.trip').dataset.id;
  save(load().filter(t => t.id !== id));
  transition(renderTrips);
});

$('#tripList').addEventListener('change', e => {
  const id = e.target.closest('.trip')?.dataset.id;
  save(load().map(t => t.id === id ? { ...t, status: e.target.value } : t));
  say(`Status: ${e.target.value}`);
});

$('#clear').addEventListener('click', () => {
  if (!confirm('Remove all saved trips?')) return;
  save([]);
  transition(renderTrips);
});

/* ---------- AI planner ---------- */
// To use a real model, set AI_ENDPOINT to YOUR backend route (it holds the API key and calls the model).
// It receives POST { prompt } and must return { title, summary, days:[{title, items:[string]}], tips:[string] }.
// Never put an API key in this file. Leave it empty to use the built-in demo planner.
const AI_ENDPOINT = '/api/plan';

function localPlan(prompt) {
  const text = prompt.toLowerCase();
  const d = DESTINATIONS.find(x => text.includes(x.name.toLowerCase()));
  if (!d) return { title: 'Which destination?', summary: 'Name a place from the list below, for example Goa, Bali or Jaipur.', days: [], tips: [] };

  const n = Math.min(Math.max(+(text.match(/(\d+)\s*[- ]?(?:day|night)/)?.[1] ?? (text.includes('weekend') ? 2 : d.stay.match(/\d+/)[0])), 1), 7);
  const budget = prompt.match(/(?:₹|rs\.?|inr)\s?[\d,]+k?/i)?.[0];
  const spots = d.known.split(', ');

  const days = Array.from({ length: n }, (_, i) => {
    const spot = spots[i % spots.length];
    const items = i === 0
      ? [`Arrive in ${d.name} and check in`, `Easy first evening: ${spot.toLowerCase()} nearby`, 'Dinner at a well-reviewed local place']
      : i === n - 1 && n > 1
        ? [`Morning: last look at ${spot.toLowerCase()}`, 'Pick up souvenirs and local food', 'Head to the airport or station']
        : [`Morning: ${spot}`, 'Afternoon: local lunch and free time', 'Evening: relaxed walk and dinner'];
    return { title: `Day ${i + 1}`, items };
  });

  const tips = [`Best time to visit ${d.name}: ${d.best}.`, 'Book stay and transport first, they are usually the biggest cost.'];
  if (budget) tips.push(`Budget noted: ${budget}. Compare 2–3 stays before booking.`);
  return { title: `${n} day${n > 1 ? 's' : ''} in ${d.name}`, summary: d.brief, days, tips, dest: d.name, demo: true };
}

async function askAI(prompt) {
  if (!AI_ENDPOINT) { await new Promise(r => setTimeout(r, 700)); return localPlan(prompt); }
  const res = await fetch(AI_ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error('AI request failed');
  return res.json();
}

const plan = $('#plan'), aiPrompt = $('#aiPrompt'), aiGo = $('#aiGo');
let lastPlan = null;

function renderPlan(p) {
  lastPlan = p;
  plan.classList.remove('loading');
  plan.innerHTML = `
    <h3>${esc(p.title)}</h3>
    <p class="summary">${esc(p.summary)}</p>
    ${p.days.length ? `<div class="days">${p.days.map(d => `
      <div class="day"><h4>${esc(d.title)}</h4><ul>${d.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div>` : ''}
    ${p.tips?.length ? `<ul class="tips">${p.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    ${p.days.length ? '<button class="btn primary" id="savePlan" type="button">Save as trip</button>' : ''}
    ${p.demo ? '<p class="note">Demo planner: built from the destination guide, not a live AI model. Connect a backend to enable full AI.</p>' : ''}`;
}

async function runAI(prompt) {
  aiGo.disabled = true; aiGo.textContent = 'Planning…';
  plan.hidden = false; plan.classList.add('loading'); plan.textContent = 'Route AI is building your plan…';
  try { renderPlan(await askAI(prompt)); }
  catch { plan.classList.remove('loading'); plan.textContent = 'Could not reach the AI service. Try again in a moment.'; }
  finally { aiGo.disabled = false; aiGo.textContent = 'Plan with AI'; }
}

$('#aiForm').addEventListener('submit', e => { e.preventDefault(); runAI(aiPrompt.value.trim()); });
$('#chips').addEventListener('click', e => {
  if (!e.target.matches('.chip')) return;
  aiPrompt.value = e.target.textContent;
  runAI(aiPrompt.value);
});
plan.addEventListener('click', e => {
  if (e.target.id !== 'savePlan' || !lastPlan) return;
  const trips = load();
  trips.unshift({ id: crypto.randomUUID(), status: 'Planning', kind: 'AI plan', from: $('input[name=from]').value || '—',
    to: lastPlan.dest ?? lastPlan.title, depart: '', ret: '', pax: lastPlan.title });
  save(trips);
  transition(renderTrips);
  say('AI plan saved to My trips');
});

$('#dAI').addEventListener('click', () => {
  dlg.close();
  aiPrompt.value = `${active.stay.match(/\d+/)[0]} day trip to ${active.name}`;
  $('#ai').scrollIntoView({ behavior: 'smooth' });
  runAI(aiPrompt.value);
});

/* ---------- init ---------- */
$('#places').innerHTML = DESTINATIONS.map(d => `<option value="${esc(d.name)}">`).join('');
const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type=date]').forEach(i => (i.min = today));
$('#yr').textContent = new Date().getFullYear();
// Hide a photo that fails to load so the gradient shows instead.
grid.addEventListener('error', e => { if (e.target.tagName === 'IMG') e.target.remove(); }, true);
renderGrid();
renderTrips();