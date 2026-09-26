
(function() {
  "use strict";

  function getInitialData() {
    return {
      warehouses: [
        {
          id: 'wh-mum',
          name: 'Main Logistics Hub (Bhiwandi, Mumbai)',
          address: 'Plot 42, Mankoli Naka, Bhiwandi, Maharashtra 421302',
          locations: [
            { id: 'loc-m1', name: 'Zone A / Rack 01 / Bin 101', zone: 'Zone A', rack: 'Rack 01', bin: 'Bin 101' },
            { id: 'loc-m2', name: 'Zone A / Rack 02 / Bin 104', zone: 'Zone A', rack: 'Rack 02', bin: 'Bin 104' },
            { id: 'loc-m3', name: 'Zone B / Rack 01 / Bin 201', zone: 'Zone B', rack: 'Rack 01', bin: 'Bin 201' }
          ]
        },
        {
          id: 'wh-blr',
          name: 'Assembly & Staging Floor (Peenya, Bengaluru)',
          address: 'Phase 2, Peenya Industrial Area, Bengaluru, Karnataka 560058',
          locations: [
            { id: 'loc-b1', name: 'Production Staging Line 1', zone: 'Line 1', rack: 'Staging', bin: 'Stage-A' },
            { id: 'loc-b2', name: 'Sub-Assembly Bay 2', zone: 'Line 2', rack: 'Assembly', bin: 'Bay-B' }
          ]
        },
        {
          id: 'wh-chn',
          name: 'Southern Regional Hub (Sriperumbudur, Chennai)',
          address: 'SIPCOT Industrial Park, Sriperumbudur, Tamil Nadu 602105',
          locations: [
            { id: 'loc-c1', name: 'Depot Warehouse / Rack 01 / Bin 01', zone: 'Depot', rack: 'Rack 01', bin: 'Bin 01' },
            { id: 'loc-c2', name: 'Cold & Moisture Storage Vault', zone: 'Depot', rack: 'Vault 1', bin: 'Sec-02' }
          ]
        }
      ],
      categories: [
        { id: 'cat-furn', name: 'Furniture' },
        { id: 'cat-raw', name: 'Raw Materials' },
        { id: 'cat-comp', name: 'Components' },
        { id: 'cat-fg', name: 'Finished Goods' },
        { id: 'cat-pkg', name: 'Packaging' }
      ],
      products: [
        { id: 'p0', sku: 'ST-001', product_code: 'ST-001', name: 'Ergonomic Office Chair', product_name: 'Ergonomic Office Chair', category: 'Furniture', uom: 'Units', stock: 100, quantity_on_hand: 100, reorder: 25, warehouse: 'wh-mum', location: 'loc-m1', cost: 4200 },
        { id: 'p1', sku: 'STL-RD-012', product_code: 'STL-RD-012', name: 'High-Tensile Steel Rods (12mm)', product_name: 'High-Tensile Steel Rods (12mm)', category: 'Raw Materials', uom: 'kg', stock: 450, quantity_on_hand: 450, reorder: 150, warehouse: 'wh-mum', location: 'loc-m1', cost: 68 },
        { id: 'p2', sku: 'STL-SH-002', product_code: 'STL-SH-002', name: 'Cold-Rolled Steel Sheet (2mm)', product_name: 'Cold-Rolled Steel Sheet (2mm)', category: 'Raw Materials', uom: 'sheet', stock: 38, quantity_on_hand: 38, reorder: 50, warehouse: 'wh-mum', location: 'loc-m2', cost: 1250 },
        { id: 'p3', sku: 'CMP-BLT-M8', product_code: 'CMP-BLT-M8', name: 'Hexagonal High-Grade Bolts M8', product_name: 'Hexagonal High-Grade Bolts M8', category: 'Components', uom: 'pcs', stock: 2800, quantity_on_hand: 2800, reorder: 600, warehouse: 'wh-mum', location: 'loc-m3', cost: 4.5 },
        { id: 'p4', sku: 'CMP-BRG-608', product_code: 'CMP-BRG-608', name: 'Precision Ball Bearings 608ZZ', product_name: 'Precision Ball Bearings 608ZZ', category: 'Components', uom: 'pcs', stock: 0, quantity_on_hand: 0, reorder: 250, warehouse: 'wh-mum', location: 'loc-m3', cost: 35 },
        { id: 'p5', sku: 'FG-BRK-100', product_code: 'FG-BRK-100', name: 'Modular Heavy-Duty Steel Bracket', product_name: 'Modular Heavy-Duty Steel Bracket', category: 'Finished Goods', uom: 'pcs', stock: 14, quantity_on_hand: 14, reorder: 20, warehouse: 'wh-blr', location: 'loc-b1', cost: 850 },
        { id: 'p6', sku: 'PKG-BOX-L', product_code: 'PKG-BOX-L', name: 'Heavy Corrugated Packing Box (L)', product_name: 'Heavy Corrugated Packing Box (L)', category: 'Packaging', uom: 'pcs', stock: 950, quantity_on_hand: 950, reorder: 300, warehouse: 'wh-mum', location: 'loc-m2', cost: 42 },
        { id: 'p7', sku: 'RAW-ALU-6M', product_code: 'RAW-ALU-6M', name: 'Anodized Aluminium Extrusion 6m', product_name: 'Anodized Aluminium Extrusion 6m', category: 'Raw Materials', uom: 'pcs', stock: 120, quantity_on_hand: 120, reorder: 40, warehouse: 'wh-chn', location: 'loc-c1', cost: 1650 }
      ],
      receipts: [
        { id: 'r0', number: 'IN/0001', reference_no: 'IN/0001', supplier: 'ABC Suppliers', partner_name: 'ABC Suppliers', operation_type: 'receipt', date: '2026-09-26', warehouse: 'wh-mum', status: 'Draft', product_code: 'ST-001', quantity: 20, items: [{ product: 'p0', qty: 20, uom: 'Units' }] },
        { id: 'r1', number: 'REC-1042', reference_no: 'REC-1042', supplier: 'Tata Steelworks Ltd (Jamshedpur)', partner_name: 'Tata Steelworks Ltd (Jamshedpur)', operation_type: 'receipt', date: '2026-09-22', warehouse: 'wh-mum', status: 'Done', items: [{ product: 'p1', qty: 200, uom: 'kg' }] },
        { id: 'r2', number: 'REC-1043', reference_no: 'REC-1043', supplier: 'Bharat Fasteners & Hardware (Pune)', partner_name: 'Bharat Fasteners & Hardware (Pune)', operation_type: 'receipt', date: '2026-09-24', warehouse: 'wh-mum', status: 'Ready', items: [{ product: 'p3', qty: 1000, uom: 'pcs' }] },
        { id: 'r3', number: 'REC-1044', reference_no: 'REC-1044', supplier: 'Kirloskar Industrial Components', partner_name: 'Kirloskar Industrial Components', operation_type: 'receipt', date: '2026-09-25', warehouse: 'wh-chn', status: 'Waiting', items: [{ product: 'p2', qty: 50, uom: 'sheet' }] },
        { id: 'r4', number: 'REC-1045', reference_no: 'REC-1045', supplier: 'Reliance Polymers & Packaging', partner_name: 'Reliance Polymers & Packaging', operation_type: 'receipt', date: '2026-09-26', warehouse: 'wh-mum', status: 'Draft', items: [{ product: 'p4', qty: 300, uom: 'pcs' }] }
      ],
      deliveries: [
        { id: 'd1', number: 'DEL-2201', customer: 'Larsen & Toubro Construction (Chennai)', date: '2026-09-23', warehouse: 'wh-mum', status: 'Done', stage: 'Validate', items: [{ product: 'p0', qty: 12, uom: 'Units' }] },
        { id: 'd2', number: 'DEL-2202', customer: 'Infosys Tech Park (Bengaluru)', date: '2026-09-25', warehouse: 'wh-blr', status: 'Ready', stage: 'Pack', items: [{ product: 'p5', qty: 6, uom: 'pcs' }] },
        { id: 'd3', number: 'DEL-2203', customer: 'Wipro Digital Campus (Hyderabad)', date: '2026-09-26', warehouse: 'wh-chn', status: 'Waiting', stage: 'Pick', items: [{ product: 'p0', qty: 15, uom: 'Units' }] },
        { id: 'd4', number: 'DEL-2204', customer: 'Godrej Interio Retail (Delhi NCR)', date: '2026-09-26', warehouse: 'wh-mum', status: 'Draft', stage: 'Pick', items: [{ product: 'p6', qty: 150, uom: 'pcs' }] }
      ],
      transfers: [
        { id: 't1', number: 'TRF-330', sourceWh: 'wh-mum', sourceLoc: 'loc-m1', destWh: 'wh-blr', destLoc: 'loc-b1', product: 'p1', qty: 80, date: '2026-09-24', status: 'Done' },
        { id: 't2', number: 'TRF-331', sourceWh: 'wh-mum', sourceLoc: 'loc-m2', destWh: 'wh-chn', destLoc: 'loc-c1', product: 'p6', qty: 120, date: '2026-09-25', status: 'Ready' },
        { id: 't3', number: 'TRF-332', sourceWh: 'wh-mum', sourceLoc: 'loc-m1', destWh: 'wh-mum', destLoc: 'loc-m3', product: 'p7', qty: 25, date: '2026-09-26', status: 'Waiting' }
      ],
      adjustments: [
        { id: 'a1', product: 'p2', warehouse: 'wh-mum', location: 'loc-m2', recorded: 41, counted: 38, diff: -3, reason: 'Physical cycle count shrinkage', date: '2026-09-25', user: 'Aarav Sharma' },
        { id: 'a2', product: 'p1', warehouse: 'wh-mum', location: 'loc-m1', recorded: 445, counted: 450, diff: 5, reason: 'Recount reconciliation after Tata delivery', date: '2026-09-23', user: 'Priya Patel' }
      ],
      ledger: [
        { date: '2026-09-26 10:15', ref: 'REC-1042', product: 'p1', op: 'Receipt', source: 'Tata Steelworks Ltd (Jamshedpur)', destination: 'Main Logistics Hub (Mumbai)', qty: 200, balance: 450, user: 'Aarav Sharma' },
        { date: '2026-09-25 15:30', ref: 'TRF-330', product: 'p1', op: 'Internal Transfer', source: 'Main Logistics Hub (Mumbai)', destination: 'Assembly Floor (Bengaluru)', qty: -80, balance: 250, user: 'Vikram Malhotra' },
        { date: '2026-09-25 11:20', ref: 'ADJ-001', product: 'p2', op: 'Adjustment', source: 'Zone A / Rack 02', destination: 'Zone A / Rack 02', qty: -3, balance: 38, user: 'Aarav Sharma' },
        { date: '2026-09-24 16:45', ref: 'DEL-2201', product: 'p0', op: 'Delivery', source: 'Main Logistics Hub (Mumbai)', destination: 'L&T Construction (Chennai)', qty: -12, balance: 100, user: 'Priya Patel' },
        { date: '2026-09-24 09:30', ref: 'TRF-331', product: 'p6', op: 'Internal Transfer', source: 'Main Logistics Hub (Mumbai)', destination: 'Southern Hub (Chennai)', qty: -120, balance: 830, user: 'Ananya Iyer' },
        { date: '2026-09-23 08:50', ref: 'ADJ-002', product: 'p1', op: 'Adjustment', source: 'Zone A / Rack 01', destination: 'Zone A / Rack 01', qty: 5, balance: 445, user: 'Aarav Sharma' }
      ],
      nextIds: { receipt: 1046, delivery: 2205, transfer: 333, adjustment: 3 }
    };
  }

  const STORAGE_KEY = 'stocksense_ims_v4';
  let State = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {
      data: getInitialData(),
      user: { name: 'Aarav Sharma', email: 'aarav.sharma@stocksense.in', role: 'Inventory Operations Lead' },
      theme: localStorage.getItem('stocksense_theme') || 'light'
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(State));
    } catch(e) {}
  }

  let currentRoute = location.hash.slice(1) || '/dashboard';
  let dashFilters = { type: 'All', status: 'All', warehouse: 'All', category: 'All', q: '' };
  let dashPage = 1;
  const DASH_PER_PAGE = 8;
  let activeModal = null;

  document.documentElement.setAttribute('data-theme', State.theme);

  window.toggleTheme = function() {
    State.theme = State.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', State.theme);
    localStorage.setItem('stocksense_theme', State.theme);
    saveState();
    renderApp();
    showToast('Switched to ' + State.theme + ' theme');
  };

  window.addEventListener('hashchange', function() {
    currentRoute = location.hash.slice(1) || '/dashboard';
    document.getElementById('sidebarNav')?.classList.remove('open');
    renderApp();
    window.scrollTo(0, 0);
  });

  window.go = function(path) {
    location.hash = '#' + path;
  };

  window.toggleSidebar = function(open) {
    const s = document.getElementById('sidebarNav');
    if (s) s.classList.toggle('open', open);
  };

  window.addEventListener('keydown', function(e) {
    if (e.key === '/' && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const el = document.getElementById('globalSearch') || document.getElementById('dfQ');
      if (el) { el.focus(); el.select(); }
    } else if (e.key === 'Escape') {
      closeModal();
      document.getElementById('sidebarNav')?.classList.remove('open');
    }
  });

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function fmtNum(n) { return Number(n || 0).toLocaleString('en-IN'); }
  function fmtDate(d) {
    if (!d) return '—';
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function findProduct(id) { return State.data.products.find(p => p.id === id); }
  function findWarehouse(id) { return State.data.warehouses.find(w => w.id === id); }
  function getLocationLabel(whId, locId) {
    const wh = findWarehouse(whId);
    if (!wh) return '—';
    const loc = wh.locations.find(l => l.id === locId);
    return loc ? loc.name : 'Standard Staging';
  }
  function stockStatus(p) {
    if (p.stock <= 0) return 'out';
    if (p.stock <= p.reorder) return 'low';
    return 'in';
  }
  function stockBadge(p) {
    const s = stockStatus(p);
    const map = { in: ['badge-instock', 'In Stock'], low: ['badge-low', 'Low Stock'], out: ['badge-out', 'Out of Stock'] };
    return `<span class="badge ${map[s][0]}">${map[s][1]}</span>`;
  }
  function statusBadge(s) {
    const cls = 'badge-' + String(s).toLowerCase();
    return `<span class="badge ${cls}">${esc(s)}</span>`;
  }
  function initials(name) {
    return (name || 'Aarav Sharma').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }

  function showToast(msg) {
    let wrap = document.getElementById('toastWrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'toastWrap';
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span>●</span> <span>${esc(msg)}</span>`;
    wrap.appendChild(t);
    setTimeout(() => t.remove(), 3200);
  }

  window.openModal = function(html) {
    activeModal = html;
    let overlay = document.getElementById('modalOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'modalOverlay';
      overlay.className = 'modal-overlay';
      overlay.onclick = function(e) { if (e.target === overlay) closeModal(); };
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = html;
    overlay.style.display = 'flex';
  };

  window.closeModal = function() {
    activeModal = null;
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.style.display = 'none';
  };

  window.exportCSV = function(filename, rows) {
    if (!rows || !rows.length) return showToast('No data available to export');
    const keys = Object.keys(rows[0]);
    const csvContent = "data:text/csv;charset=utf-8," + 
      keys.join(",") + "\n" + 
      rows.map(r => keys.map(k => '"' + String(r[k] || '').replace(/"/g, '""') + '"').join(",")).join("\n");
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", filename + ".csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Exported ' + filename + '.csv');
  };

  const NAV_SECTIONS = [
    { label: null, items: [{ path: '/dashboard', name: 'Dashboard', icon: '📊' }] },
    { label: 'Products', items: [
      { path: '/products', name: 'All Products', icon: '📦' },
      { path: '/categories', name: 'Categories', icon: '🏷️' },
      { path: '/reorder-rules', name: 'Reordering Rules', icon: '⚙️' }
    ]},
    { label: 'Operations', items: [
      { path: '/receipts', name: 'Receipts', icon: '📥' },
      { path: '/deliveries', name: 'Delivery Orders', icon: '🚚' },
      { path: '/transfers', name: 'Internal Transfers', icon: '🔄' },
      { path: '/adjustments', name: 'Inventory Adjustments', icon: '⚖️' },
      { path: '/ledger', name: 'Move History', icon: '📜' }
    ]},
    { label: 'Warehouse', items: [
      { path: '/warehouses', name: 'Warehouses & Locations', icon: '🏢' }
    ]},
    { label: 'System', items: [
      { path: '/settings', name: 'Settings', icon: '🛠️' }
    ]}
  ];

  function renderSidebar() {
    const user = State.user;
    return `
      <aside class="sidebar" id="sidebarNav">
        <div class="sidebar-brand">
          <div class="brand-logo">S</div>
          <div>
            <div class="brand-title">StockSense</div>
            <div class="brand-sub">Inventory Cloud (IMS)</div>
          </div>
        </div>

        <div class="sidebar-action-wrap">
          <button class="btn-sidebar-add" onclick="openNewActionModal()">
            <span>+</span> <span>Add New Item</span>
          </button>
        </div>

        <nav class="sidebar-menu">
          ${NAV_SECTIONS.map(sec => `
            <div>
              ${sec.label ? `<div class="menu-group-title">${sec.label}</div>` : ''}
              ${sec.items.map(it => {
                const isActive = currentRoute === it.path || 
                  (it.path !== '/dashboard' && currentRoute.startsWith(it.path)) ||
                  (it.path === '/deliveries' && currentRoute.startsWith('/delivery')) ||
                  (it.path === '/ledger' && (currentRoute.startsWith('/history') || currentRoute.startsWith('/moves'))) ||
                  (it.path === '/warehouses' && currentRoute.startsWith('/locations'));
                return `
                  <div class="menu-item ${isActive ? 'active' : ''}" onclick="go('${it.path}')">
                    <span>${it.icon}</span>
                    <span>${esc(it.name)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `).join('')}
        </nav>

        <div class="sidebar-footer">
          <div class="theme-row">
            <span>Theme: <b>${State.theme === 'dark' ? 'Dark' : 'Light'}</b></span>
            <button class="theme-btn" onclick="toggleTheme()">${State.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
          </div>
          <div class="user-card" onclick="go('/profile')" style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:10px;overflow:hidden;">
              <div class="user-avatar">${initials(user.name)}</div>
              <div class="user-info">
                <div class="user-name">${esc(user.name)}</div>
                <div class="user-role">${esc(user.role)}</div>
              </div>
            </div>
            <button style="background:none;border:none;cursor:pointer;color:var(--sidebar-muted);font-size:15px;padding:4px;" title="Switch User / Sign Out" onclick="event.stopPropagation(); logoutUser();">🚪</button>
          </div>
        </div>
      </aside>
    `;
  }

  function renderHeader() {
    const lowStockAlerts = State.data.products.filter(p => stockStatus(p) !== 'in');
    const clean = currentRoute.split('?')[0];
    let crumb = 'Dashboard';
    if (clean === '/products') crumb = 'Products / All Products';
    else if (clean.startsWith('/products/')) crumb = 'Products / Product Detail';
    else if (clean === '/categories') crumb = 'Products / Categories';
    else if (clean === '/reorder-rules' || clean === '/reordering-rules') crumb = 'Products / Reordering Rules';
    else if (clean === '/receipts') crumb = 'Operations / Vendor Receipts';
    else if (clean === '/deliveries' || clean === '/delivery') crumb = 'Operations / Delivery Orders';
    else if (clean === '/transfers') crumb = 'Operations / Internal Transfers';
    else if (clean === '/adjustments') crumb = 'Operations / Inventory Adjustments';
    else if (clean === '/ledger' || clean === '/history' || clean === '/moves') crumb = 'Operations / Move History Ledger';
    else if (clean === '/warehouses' || clean === '/locations') crumb = 'Warehouse / Facilities & Locations';
    else if (clean === '/settings') crumb = 'System / Settings';
    else if (clean === '/profile') crumb = 'Account / My Profile';

    return `
      <header class="header">
        <div class="header-left">
          <button class="menu-toggle-btn" onclick="toggleSidebar(true)">☰</button>
          <div class="breadcrumbs">
            <a onclick="go('/dashboard')">StockSense</a>
            <span class="breadcrumbs-sep">/</span>
            <span class="breadcrumbs-curr">${esc(crumb)}</span>
          </div>
        </div>

        <div class="header-center">
          <div class="search-pill">
            <span>🔍</span>
            <input id="globalSearch" placeholder="Search product SKU, document #, or location..." onkeydown="if(event.key==='Enter') go('/products?q='+encodeURIComponent(this.value))">
            <span class="hotkey-tag">/</span>
          </div>
        </div>

        <div class="header-right">
          <button class="header-btn" onclick="go('/reorder-rules')" title="Low Stock Alerts">
            <span>🔔</span>
            ${lowStockAlerts.length > 0 ? '<span class="alert-dot"></span>' : ''}
          </button>
          <div class="user-avatar" onclick="go('/profile')" style="cursor:pointer;" title="${esc(State.user.name)}">
            ${initials(State.user.name)}
          </div>
        </div>
      </header>
    `;
  }

  function getDashboardFeed() {
    const feed = [];
    State.data.receipts.forEach(r => r.items.forEach(it => feed.push({
      doc: r.number, type: 'Receipt', product: it.product, wh: r.warehouse, loc: null, qty: it.qty, status: r.status, date: r.date, link: '/receipts'
    })));
    State.data.deliveries.forEach(d => d.items.forEach(it => feed.push({
      doc: d.number, type: 'Delivery', product: it.product, wh: d.warehouse, loc: null, qty: -it.qty, status: d.status, date: d.date, link: '/deliveries'
    })));
    State.data.transfers.forEach(t => feed.push({
      doc: t.number, type: 'Internal', product: t.product, wh: t.destWh, loc: t.destLoc, qty: t.qty, status: t.status, date: t.date, link: '/transfers'
    }));
    State.data.adjustments.forEach(a => feed.push({
      doc: 'ADJ-' + a.id.slice(1).padStart(3, '0'), type: 'Adjustment', product: a.product, wh: a.warehouse, loc: a.location, qty: a.diff, status: 'Done', date: a.date, link: '/adjustments'
    }));
    feed.sort((a, b) => new Date(b.date) - new Date(a.date));
    return feed;
  }

  function filterDashboardFeed(feed) {
    const f = dashFilters;
    return feed.filter(r => {
      if (f.type !== 'All' && r.type !== f.type) return false;
      if (f.status !== 'All' && r.status !== f.status) return false;
      if (f.warehouse !== 'All' && r.wh !== f.warehouse) return false;
      if (f.category !== 'All') {
        const p = findProduct(r.product);
        if (!p || p.category !== f.category) return false;
      }
      if (f.q) {
        const p = findProduct(r.product);
        const hay = (r.doc + ' ' + (p ? p.name + ' ' + p.sku : '')).toLowerCase();
        if (!hay.includes(f.q.toLowerCase())) return false;
      }
      return true;
    });
  }

  function pageDashboard() {
    const prods = State.data.products;
    const totalUnits = prods.reduce((acc, p) => acc + p.stock, 0);
    const lowCount = prods.filter(p => stockStatus(p) === 'low').length;
    const outCount = prods.filter(p => stockStatus(p) === 'out').length;
    const pendingReceipts = State.data.receipts.filter(r => r.status !== 'Done' && r.status !== 'Canceled').length;
    const pendingDeliveries = State.data.deliveries.filter(d => d.status !== 'Done' && d.status !== 'Canceled').length;
    const pendingTransfers = State.data.transfers.filter(t => t.status !== 'Done' && t.status !== 'Canceled').length;

    const allFeed = filterDashboardFeed(getDashboardFeed());
    const totalPages = Math.ceil(allFeed.length / DASH_PER_PAGE) || 1;
    if (dashPage > totalPages) dashPage = totalPages;
    const pagedFeed = allFeed.slice((dashPage - 1) * DASH_PER_PAGE, dashPage * DASH_PER_PAGE);

    const activeFilterCount = ['type', 'status', 'warehouse', 'category'].filter(k => dashFilters[k] !== 'All').length + (dashFilters.q ? 1 : 0);
    const attentionItems = prods.filter(p => stockStatus(p) !== 'in').slice(0, 5);

    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Inventory Dashboard</h1>
          <div class="page-subtitle">Centralized real-time overview of warehouse stock, movements, and operational alerts.</div>
        </div>
        <div class="page-actions">
          <div style="font-size:12px;font-weight:600;padding:6px 12px;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);color:var(--ink-soft);">
            Operations Date: <b>Today, 26 Sep 2026</b>
          </div>
          <button class="btn btn-primary" onclick="openNewActionModal()">
            <span>+</span> <span>New Operation</span>
          </button>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-box">
          <div class="kpi-top">
            <span class="kpi-name">Total Stock in Hand</span>
            <span class="kpi-icon-pill" style="background:var(--info-bg);color:var(--info);">📦</span>
          </div>
          <div class="kpi-number">${fmtNum(totalUnits)}</div>
          <div class="kpi-meta">${prods.length} active SKUs tracked</div>
        </div>

        <div class="kpi-box">
          <div class="kpi-top">
            <span class="kpi-name">Low Stock Items</span>
            <span class="kpi-icon-pill" style="background:var(--warning-bg);color:var(--warning);">⚠️</span>
          </div>
          <div class="kpi-number" style="color:var(--warning);">${lowCount}</div>
          <div class="kpi-meta">At or below reorder threshold</div>
        </div>

        <div class="kpi-box">
          <div class="kpi-top">
            <span class="kpi-name">Out of Stock Items</span>
            <span class="kpi-icon-pill" style="background:var(--danger-bg);color:var(--danger);">⛔</span>
          </div>
          <div class="kpi-number" style="color:var(--danger);">${outCount}</div>
          <div class="kpi-meta">Requires urgent vendor purchase</div>
        </div>

        <div class="kpi-box">
          <div class="kpi-top">
            <span class="kpi-name">Pending Receipts</span>
            <span class="kpi-icon-pill" style="background:var(--primary-light);color:var(--primary);">📥</span>
          </div>
          <div class="kpi-number">${pendingReceipts}</div>
          <div class="kpi-meta">Incoming vendor shipments</div>
        </div>

        <div class="kpi-box">
          <div class="kpi-top">
            <span class="kpi-name">Pending Deliveries</span>
            <span class="kpi-icon-pill" style="background:var(--info-bg);color:var(--info);">🚚</span>
          </div>
          <div class="kpi-number">${pendingDeliveries}</div>
          <div class="kpi-meta">Customer orders in dispatch</div>
        </div>

        <div class="kpi-box">
          <div class="kpi-top">
            <span class="kpi-name">Internal Transfers</span>
            <span class="kpi-icon-pill" style="background:#f5f3ff;color:#7c3aed;">🔄</span>
          </div>
          <div class="kpi-number">${pendingTransfers}</div>
          <div class="kpi-meta">Scheduled warehouse moves</div>
        </div>
      </div>

      <div style="background:var(--primary-light);border:1px solid var(--primary-border);border-radius:var(--radius-lg);padding:18px 20px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <div style="font-weight:700;font-size:14px;color:var(--primary-text);">StockSense End-to-End Inventory Lifecycle</div>
            <div style="font-size:12px;color:var(--ink-soft);">Demonstrating seamless stock movement across vendor receipt, internal transfer, customer delivery, and audit.</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="runDemoLifecycle()">⚡ Run 1-Click Simulation</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:10px;">
          <div style="background:var(--surface);padding:10px 12px;border-radius:var(--radius);border:1px solid var(--line);">
            <div style="font-size:10px;font-weight:700;color:var(--primary);">STEP 1 • VENDOR RECEIPT</div>
            <div style="font-weight:600;font-size:12px;">+100 kg Steel Rods</div>
            <div style="font-size:11px;color:var(--ink-faint);">Stock automatically increases.</div>
          </div>
          <div style="background:var(--surface);padding:10px 12px;border-radius:var(--radius);border:1px solid var(--line);">
            <div style="font-size:10px;font-weight:700;color:var(--primary);">STEP 2 • TRANSFER</div>
            <div style="font-weight:600;font-size:12px;">Move to Assembly Bay</div>
            <div style="font-size:11px;color:var(--ink-faint);">Relocated; company total same.</div>
          </div>
          <div style="background:var(--surface);padding:10px 12px;border-radius:var(--radius);border:1px solid var(--line);">
            <div style="font-size:10px;font-weight:700;color:var(--primary);">STEP 3 • DELIVERY</div>
            <div style="font-weight:600;font-size:12px;">Deliver -20 to L&T</div>
            <div style="font-size:11px;color:var(--ink-faint);">Pick ➔ Pack ➔ Validate (-20).</div>
          </div>
          <div style="background:var(--surface);padding:10px 12px;border-radius:var(--radius);border:1px solid var(--line);">
            <div style="font-size:10px;font-weight:700;color:var(--primary);">STEP 4 • ADJUSTMENT</div>
            <div style="font-weight:600;font-size:12px;">Audit Damaged (-3)</div>
            <div style="font-size:11px;color:var(--ink-faint);">Reason logged in Stock Ledger.</div>
          </div>
        </div>
      </div>

      <div class="quick-row">
        <div class="quick-card" onclick="openNewReceiptModal()">
          <div class="quick-ico" style="background:var(--primary-light);color:var(--primary);">📥</div>
          <div>
            <div class="quick-title">Receive Stock</div>
            <div class="quick-desc">Incoming vendor consignment</div>
          </div>
        </div>
        <div class="quick-card" onclick="openNewDeliveryModal()">
          <div class="quick-ico" style="background:#eff6ff;color:#2563eb;">🚚</div>
          <div>
            <div class="quick-title">Create Delivery</div>
            <div class="quick-desc">Dispatch to customer project</div>
          </div>
        </div>
        <div class="quick-card" onclick="openNewTransferModal()">
          <div class="quick-ico" style="background:#f5f3ff;color:#7c3aed;">🔄</div>
          <div>
            <div class="quick-title">Internal Transfer</div>
            <div class="quick-desc">Relocate between locations</div>
          </div>
        </div>
        <div class="quick-card" onclick="openNewAdjustmentModal()">
          <div class="quick-ico" style="background:#fffbeb;color:#d97706;">⚖️</div>
          <div>
            <div class="quick-title">Stock Adjustment</div>
            <div class="quick-desc">Reconcile physical counts</div>
          </div>
        </div>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-field">
            <label class="filter-label">Search Operations</label>
            <input type="text" id="dfQ" class="input-control" placeholder="Search by SKU, product, or doc #..." value="${esc(dashFilters.q)}" oninput="setDashFilter('q', this.value)">
          </div>
          <div class="filter-field">
            <label class="filter-label">Document Type</label>
            <select class="input-control" onchange="setDashFilter('type', this.value)">
              <option value="All" ${dashFilters.type==='All'?'selected':''}>All Types</option>
              <option value="Receipt" ${dashFilters.type==='Receipt'?'selected':''}>Receipts (Incoming)</option>
              <option value="Delivery" ${dashFilters.type==='Delivery'?'selected':''}>Deliveries (Outgoing)</option>
              <option value="Internal" ${dashFilters.type==='Internal'?'selected':''}>Internal Transfers</option>
              <option value="Adjustment" ${dashFilters.type==='Adjustment'?'selected':''}>Adjustments</option>
            </select>
          </div>
          <div class="filter-field">
            <label class="filter-label">Status</label>
            <select class="input-control" onchange="setDashFilter('status', this.value)">
              <option value="All" ${dashFilters.status==='All'?'selected':''}>All Statuses</option>
              <option value="Draft" ${dashFilters.status==='Draft'?'selected':''}>Draft</option>
              <option value="Waiting" ${dashFilters.status==='Waiting'?'selected':''}>Waiting</option>
              <option value="Ready" ${dashFilters.status==='Ready'?'selected':''}>Ready</option>
              <option value="Done" ${dashFilters.status==='Done'?'selected':''}>Done</option>
              <option value="Canceled" ${dashFilters.status==='Canceled'?'selected':''}>Canceled</option>
            </select>
          </div>
          <div class="filter-field">
            <label class="filter-label">Warehouse</label>
            <select class="input-control" onchange="setDashFilter('warehouse', this.value)">
              <option value="All" ${dashFilters.warehouse==='All'?'selected':''}>All Hubs</option>
              ${State.data.warehouses.map(w => `<option value="${w.id}" ${dashFilters.warehouse===w.id?'selected':''}>${esc(w.name)}</option>`).join('')}
            </select>
          </div>
          <div class="filter-field">
            <label class="filter-label">Category</label>
            <select class="input-control" onchange="setDashFilter('category', this.value)">
              <option value="All" ${dashFilters.category==='All'?'selected':''}>All Categories</option>
              ${State.data.categories.map(c => `<option value="${esc(c.name)}" ${dashFilters.category===c.name?'selected':''}>${esc(c.name)}</option>`).join('')}
            </select>
          </div>
          ${activeFilterCount > 0 ? `
            <button class="btn btn-secondary btn-sm" onclick="clearDashFilters()">Clear (${activeFilterCount})</button>
          ` : '<div></div>'}
        </div>
      </div>

      <div class="table-panel">
        <div class="table-panel-head">
          <div class="table-panel-title">
            <span>Recent Operations & Stock Movements</span>
            <span class="badge-count">${allFeed.length} matching</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="go('/ledger')">📜 Full Audit Ledger</button>
        </div>

        ${pagedFeed.length === 0 ? `
          <div style="padding:36px;text-align:center;color:var(--ink-soft);">
            <div style="font-size:24px;margin-bottom:6px;">📦</div>
            <div style="font-weight:600;">No operations found</div>
            <div style="font-size:12px;margin-top:2px;">Try adjusting your search or filters.</div>
          </div>
        ` : `
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Document #</th>
                  <th>Type</th>
                  <th>Product</th>
                  <th>Warehouse / Location</th>
                  <th style="text-align:right;">Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style="text-align:right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${pagedFeed.map(r => {
                  const p = findProduct(r.product);
                  const wh = findWarehouse(r.wh);
                  const isNeg = r.qty < 0;
                  return `
                    <tr>
                      <td><a class="table-link" onclick="go('${r.link}')">${esc(r.doc)}</a></td>
                      <td>${esc(r.type)}</td>
                      <td>
                        <div style="font-weight:600;">${esc(p ? p.name : 'Unknown')}</div>
                        <div style="font-size:11px;color:var(--ink-faint);" class="mono">${esc(p ? p.sku : '')}</div>
                      </td>
                      <td>
                        <div>${esc(wh ? wh.name.split('(')[0] : '—')}</div>
                        <div style="font-size:11px;color:var(--ink-faint);">${r.loc ? esc(getLocationLabel(r.wh, r.loc)) : 'Main Staging'}</div>
                      </td>
                      <td style="text-align:right;">
                        <span class="${isNeg ? 'qty-neg' : 'qty-pos'}">${isNeg ? '' : '+'}${fmtNum(r.qty)} ${esc(p ? p.uom : '')}</span>
                      </td>
                      <td>${statusBadge(r.status)}</td>
                      <td>${fmtDate(r.date)}</td>
                      <td style="text-align:right;">
                        <button class="btn btn-secondary btn-sm" onclick="go('${r.link}')">View</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div class="pagination">
            <div>Showing ${(dashPage - 1) * DASH_PER_PAGE + 1}–${Math.min(dashPage * DASH_PER_PAGE, allFeed.length)} of ${allFeed.length} operations</div>
            <div class="pager-controls">
              <button class="btn btn-secondary btn-sm" onclick="setDashPage(-1)" ${dashPage <= 1 ? 'disabled' : ''}>Previous</button>
              <span>Page <b>${dashPage}</b> of ${totalPages}</span>
              <button class="btn btn-secondary btn-sm" onclick="setDashPage(1)" ${dashPage >= totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
        `}
      </div>

      <div class="attention-panel">
        <div class="attention-head">
          <div>
            <div style="font-size:14px;font-weight:700;">Stock Requiring Immediate Attention</div>
            <div style="font-size:12px;color:var(--ink-soft);">Items currently at or below safety reorder threshold</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="go('/reorder-rules')">⚙️ Manage Safety Rules</button>
        </div>

        ${attentionItems.length ? attentionItems.map(p => {
          const pct = p.reorder > 0 ? Math.round((p.stock / p.reorder) * 100) : 0;
          const s = stockStatus(p);
          return `
            <div class="attention-row">
              <div style="min-width:200px;">
                <div style="font-weight:600;">${esc(p.name)}</div>
                <div style="font-size:11.5px;color:var(--ink-faint);" class="mono">${esc(p.sku)} • ${esc(p.category)}</div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>Stock: <b>${p.stock} ${esc(p.uom)}</b></span>
                  <span>Safety Min: ${p.reorder}</span>
                </div>
                <div class="meter-bar">
                  <div class="meter-fill ${s}" style="width:${Math.min(100, Math.max(5, pct))}%;"></div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                ${stockBadge(p)}
                <button class="btn btn-secondary btn-sm" onclick="quickReorderProduct('${p.id}')">+ Reorder</button>
                <button class="btn btn-secondary btn-sm" onclick="go('/products/${p.id}')">Details</button>
              </div>
            </div>
          `;
        }).join('') : `
          <div style="padding:16px;text-align:center;color:var(--success);font-weight:600;font-size:12.5px;">
            ✓ All products are currently adequately stocked above safety thresholds.
          </div>
        `}
      </div>
    `;
  }

  window.setDashFilter = function(k, v) {
    dashFilters[k] = v;
    dashPage = 1;
    renderApp();
  };
  window.clearDashFilters = function() {
    dashFilters = { type: 'All', status: 'All', warehouse: 'All', category: 'All', q: '' };
    dashPage = 1;
    renderApp();
  };
  window.setDashPage = function(delta) {
    dashPage += delta;
    renderApp();
  };

  function pageProducts() {
    const prods = State.data.products;
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Product Catalog</h1>
          <div class="page-subtitle">Manage SKUs, master catalog, inventory counts, and safety thresholds.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="exportCSV('StockSense_Products', State.data.products)">Export CSV</button>
          <button class="btn btn-primary" onclick="openNewProductModal()">+ Add Product</button>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-panel-head">
          <div class="table-panel-title">
            <span>All Products</span>
            <span class="badge-count">${prods.length} items</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU / Code</th>
                <th>Category</th>
                <th>Unit</th>
                <th style="text-align:right;">Available Stock</th>
                <th>Warehouse Hub</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${prods.map(p => {
                const wh = findWarehouse(p.warehouse);
                return `
                  <tr>
                    <td><a class="table-link" onclick="go('/products/${p.id}')">${esc(p.name)}</a></td>
                    <td class="mono" style="font-weight:600;">${esc(p.sku)}</td>
                    <td>${esc(p.category)}</td>
                    <td>${esc(p.uom)}</td>
                    <td style="text-align:right;font-weight:700;">${fmtNum(p.stock)} ${esc(p.uom)}</td>
                    <td>${esc(wh ? wh.name.split('(')[0] : '—')}</td>
                    <td>${fmtNum(p.reorder)} ${esc(p.uom)}</td>
                    <td>${stockBadge(p)}</td>
                    <td style="text-align:right;">
                      <button class="btn btn-secondary btn-sm" onclick="go('/products/${p.id}')">View</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function pageProductDetail(id) {
    const p = findProduct(id);
    if (!p) return '<div class="page-body">Product not found. <a onclick="go(\'/products\')">Return to catalog</a></div>';
    const wh = findWarehouse(p.warehouse);
    const history = State.data.ledger.filter(l => l.product === p.id);

    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">${esc(p.name)}</h1>
          <div class="page-subtitle" class="mono">SKU: ${esc(p.sku)} • Category: ${esc(p.category)}</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="go('/products')">Back to Catalog</button>
          <button class="btn btn-primary" onclick="quickReorderProduct('${p.id}')">+ Restock</button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:14px;margin-bottom:20px;">
        <div class="kpi-box">
          <div class="kpi-name">Available Quantity</div>
          <div class="kpi-number">${fmtNum(p.stock)} ${esc(p.uom)}</div>
          <div>${stockBadge(p)}</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-name">Reorder Safety Level</div>
          <div class="kpi-number">${fmtNum(p.reorder)} ${esc(p.uom)}</div>
          <div class="kpi-meta">Automatic alert trigger</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-name">Unit Cost</div>
          <div class="kpi-number">₹${fmtNum(p.cost || 100)}</div>
          <div class="kpi-meta">Standard purchase price</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-name">Assigned Warehouse</div>
          <div style="font-weight:700;font-size:14px;margin-top:4px;">${esc(wh ? wh.name : '—')}</div>
          <div class="kpi-meta">${esc(getLocationLabel(p.warehouse, p.location))}</div>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-panel-head">
          <div class="table-panel-title">Stock Movement History for ${esc(p.name)}</div>
        </div>
        ${history.length ? `
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Operation</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th style="text-align:right;">Quantity</th>
                  <th style="text-align:right;">Balance</th>
                  <th>Logged By</th>
                </tr>
              </thead>
              <tbody>
                ${history.map(h => `
                  <tr>
                    <td>${h.date}</td>
                    <td class="mono" style="font-weight:600;">${esc(h.ref)}</td>
                    <td>${esc(h.op)}</td>
                    <td>${esc(h.source)}</td>
                    <td>${esc(h.destination)}</td>
                    <td style="text-align:right;" class="${h.qty < 0 ? 'qty-neg' : 'qty-pos'}">${h.qty < 0 ? '' : '+'}${h.qty}</td>
                    <td style="text-align:right;font-weight:700;">${h.balance}</td>
                    <td>${esc(h.user)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : '<div style="padding:20px;text-align:center;color:var(--ink-soft);">No movement transactions recorded yet for this product.</div>'}
      </div>
    `;
  }

  function pageReceipts() {
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Vendor Receipts (Incoming Stock)</h1>
          <div class="page-subtitle">Track deliveries from suppliers. Validating a receipt increments warehouse inventory automatically.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="openNewReceiptModal()">+ New Receipt</button>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Supplier / Vendor</th>
                <th>Expected Date</th>
                <th>Destination Hub</th>
                <th>Items & Quantities</th>
                <th>Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${State.data.receipts.map(r => {
                const wh = findWarehouse(r.warehouse);
                const itemsSummary = r.items.map(it => {
                  const p = findProduct(it.product);
                  return (p ? p.name : 'Item') + ' (' + it.qty + ' ' + (it.uom || 'units') + ')';
                }).join(', ');
                return `
                  <tr>
                    <td class="mono" style="font-weight:700;color:var(--primary);">${esc(r.number)}</td>
                    <td style="font-weight:600;">${esc(r.supplier)}</td>
                    <td>${fmtDate(r.date)}</td>
                    <td>${esc(wh ? wh.name.split('(')[0] : '—')}</td>
                    <td style="font-size:12px;color:var(--ink-soft);">${esc(itemsSummary)}</td>
                    <td>${statusBadge(r.status)}</td>
                    <td style="text-align:right;">
                      ${r.status !== 'Done' && r.status !== 'Canceled' ? `
                        <button class="btn btn-primary btn-sm" onclick="validateReceipt('${r.id}')">Validate & Receive</button>
                      ` : `
                        <span style="font-size:12px;color:var(--success);font-weight:600;">✓ Completed</span>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.validateReceipt = function(id) {
    const r = State.data.receipts.find(x => x.id === id);
    if (!r || r.status === 'Done') return;

    r.status = 'Done';
    r.items.forEach(it => {
      const p = findProduct(it.product);
      if (p) {
        p.stock += Number(it.qty);
        p.quantity_on_hand = p.stock;
        State.data.ledger.unshift({
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          ref: r.number,
          product: p.id,
          op: 'Receipt',
          source: r.supplier,
          destination: findWarehouse(r.warehouse)?.name || 'Main Warehouse',
          qty: Number(it.qty),
          balance: p.stock,
          user: State.user.name
        });
      }
    });

    saveState();
    renderApp();
    showToast('Receipt ' + r.number + ' validated! Stock increased automatically.');
  };

  function pageDeliveries() {
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Delivery Orders (Outgoing Stock)</h1>
          <div class="page-subtitle">Pick, pack, and ship orders to clients. Validating decreases company inventory automatically.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="openNewDeliveryModal()">+ New Delivery</button>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Delivery #</th>
                <th>Client / Project</th>
                <th>Scheduled Date</th>
                <th>Dispatch Hub</th>
                <th>Stage</th>
                <th>Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${State.data.deliveries.map(d => `
                <tr>
                  <td class="mono" style="font-weight:700;color:var(--primary);">${esc(d.number)}</td>
                  <td style="font-weight:600;">${esc(d.customer)}</td>
                  <td>${fmtDate(d.date)}</td>
                  <td>${esc(findWarehouse(d.warehouse)?.name.split('(')[0] || '—')}</td>
                  <td><span class="badge" style="background:#e0e7ff;color:#3730a3;">${esc(d.stage || 'Pick')}</span></td>
                  <td>${statusBadge(d.status)}</td>
                  <td style="text-align:right;">
                    ${d.status !== 'Done' && d.status !== 'Canceled' ? `
                      <button class="btn btn-primary btn-sm" onclick="validateDelivery('${d.id}')">Validate & Dispatch</button>
                    ` : `
                      <span style="font-size:12px;color:var(--success);font-weight:600;">✓ Dispatched</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.validateDelivery = function(id) {
    const d = State.data.deliveries.find(x => x.id === id);
    if (!d || d.status === 'Done') return;

    for (const it of d.items) {
      const p = findProduct(it.product);
      if (p && p.stock < it.qty) {
        return showToast('Cannot dispatch: Insufficient stock for ' + p.name + ' (' + p.stock + ' available)');
      }
    }

    d.status = 'Done';
    d.stage = 'Validate';
    d.items.forEach(it => {
      const p = findProduct(it.product);
      if (p) {
        p.stock -= Number(it.qty);
        p.quantity_on_hand = p.stock;
        State.data.ledger.unshift({
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          ref: d.number,
          product: p.id,
          op: 'Delivery',
          source: findWarehouse(d.warehouse)?.name || 'Main Warehouse',
          destination: d.customer,
          qty: -Number(it.qty),
          balance: p.stock,
          user: State.user.name
        });
      }
    });

    saveState();
    renderApp();
    showToast('Delivery ' + d.number + ' validated! Inventory reduced and dispatched.');
  };

  function pageTransfers() {
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Internal Transfers</h1>
          <div class="page-subtitle">Move stock between company warehouses or bays. Preserves total inventory integrity.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="openNewTransferModal()">+ Schedule Transfer</button>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Transfer #</th>
                <th>Source Location</th>
                <th>Destination Location</th>
                <th>Product</th>
                <th style="text-align:right;">Quantity</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${State.data.transfers.map(t => {
                const p = findProduct(t.product);
                return `
                  <tr>
                    <td class="mono" style="font-weight:700;color:var(--primary);">${esc(t.number)}</td>
                    <td>${esc(findWarehouse(t.sourceWh)?.name.split('(')[0] || '—')}</td>
                    <td>${esc(findWarehouse(t.destWh)?.name.split('(')[0] || '—')}</td>
                    <td style="font-weight:600;">${esc(p ? p.name : 'Unknown')}</td>
                    <td style="text-align:right;font-weight:700;">${t.qty} ${esc(p ? p.uom : '')}</td>
                    <td>${fmtDate(t.date)}</td>
                    <td>${statusBadge(t.status)}</td>
                    <td style="text-align:right;">
                      ${t.status !== 'Done' ? `
                        <button class="btn btn-primary btn-sm" onclick="completeTransfer('${t.id}')">Execute Move</button>
                      ` : '<span style="color:var(--success);font-weight:600;font-size:12px;">✓ Relocated</span>'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.completeTransfer = function(id) {
    const t = State.data.transfers.find(x => x.id === id);
    if (!t || t.status === 'Done') return;

    t.status = 'Done';
    const p = findProduct(t.product);
    if (p) {
      State.data.ledger.unshift({
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        ref: t.number,
        product: p.id,
        op: 'Internal Transfer',
        source: findWarehouse(t.sourceWh)?.name || 'Source Hub',
        destination: findWarehouse(t.destWh)?.name || 'Destination Hub',
        qty: t.qty,
        balance: p.stock,
        user: State.user.name
      });
    }

    saveState();
    renderApp();
    showToast('Transfer ' + t.number + ' completed! Location updated in ledger.');
  };

  function pageAdjustments() {
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Inventory Adjustments</h1>
          <div class="page-subtitle">Reconcile physical cycle counts against recorded system balances with live discrepancy calculations.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary" onclick="openNewAdjustmentModal()">+ New Count Adjustment</button>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Adjustment Ref</th>
                <th>Product</th>
                <th>Warehouse Hub</th>
                <th style="text-align:right;">Recorded Qty</th>
                <th style="text-align:right;">Counted Qty</th>
                <th style="text-align:right;">Discrepancy</th>
                <th>Reason</th>
                <th>Auditor</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${State.data.adjustments.map(a => {
                const p = findProduct(a.product);
                const isNeg = a.diff < 0;
                return `
                  <tr>
                    <td class="mono" style="font-weight:700;">ADJ-${a.id.slice(1).padStart(3, '0')}</td>
                    <td style="font-weight:600;">${esc(p ? p.name : 'Item')}</td>
                    <td>${esc(findWarehouse(a.warehouse)?.name.split('(')[0] || '—')}</td>
                    <td style="text-align:right;">${a.recorded}</td>
                    <td style="text-align:right;font-weight:700;">${a.counted}</td>
                    <td style="text-align:right;">
                      <span class="${isNeg ? 'qty-neg' : 'qty-pos'}">${isNeg ? '' : '+'}${a.diff}</span>
                    </td>
                    <td>${esc(a.reason)}</td>
                    <td>${esc(a.user)}</td>
                    <td>${fmtDate(a.date)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function pageLedger() {
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Move History / Stock Ledger</h1>
          <div class="page-subtitle">Immutable audit trail of all warehouse inventory receipts, dispatches, relocations, and corrections.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary" onclick="exportCSV('StockSense_Audit_Ledger', State.data.ledger)">Export CSV</button>
        </div>
      </div>

      <div class="table-panel">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Reference</th>
                <th>Product</th>
                <th>Operation Type</th>
                <th>Source</th>
                <th>Destination</th>
                <th style="text-align:right;">Quantity Delta</th>
                <th style="text-align:right;">Balance</th>
                <th>Logged By</th>
              </tr>
            </thead>
            <tbody>
              ${State.data.ledger.map(l => {
                const p = findProduct(l.product);
                const isNeg = l.qty < 0;
                return `
                  <tr>
                    <td>${l.date}</td>
                    <td class="mono" style="font-weight:700;color:var(--primary);">${esc(l.ref)}</td>
                    <td>
                      <div style="font-weight:600;">${esc(p ? p.name : 'Unknown')}</div>
                      <div style="font-size:11px;color:var(--ink-faint);" class="mono">${esc(p ? p.sku : '')}</div>
                    </td>
                    <td>${esc(l.op)}</td>
                    <td>${esc(l.source)}</td>
                    <td>${esc(l.destination)}</td>
                    <td style="text-align:right;">
                      <span class="${isNeg ? 'qty-neg' : 'qty-pos'}">${isNeg ? '' : '+'}${l.qty}</span>
                    </td>
                    <td style="text-align:right;font-weight:700;">${l.balance}</td>
                    <td>${esc(l.user)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function pageWarehouses() {
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">Warehouses & Storage Locations</h1>
          <div class="page-subtitle">Multi-facility warehouse layout and location hierarchy (Warehouse ➔ Zone ➔ Rack ➔ Bin).</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:18px;">
        ${State.data.warehouses.map(wh => {
          const prodsInWh = State.data.products.filter(p => p.warehouse === wh.id);
          const totalStock = prodsInWh.reduce((a, b) => a + b.stock, 0);
          return `
            <div class="table-panel">
              <div class="table-panel-head">
                <div>
                  <div style="font-size:15px;font-weight:700;">${esc(wh.name)}</div>
                  <div style="font-size:12px;color:var(--ink-soft);margin-top:2px;">📍 ${esc(wh.address)}</div>
                </div>
                <div style="font-size:12.5px;font-weight:600;color:var(--primary);">
                  ${prodsInWh.length} SKUs • ${fmtNum(totalStock)} Units on Hand
                </div>
              </div>
              <div style="padding:16px 20px;">
                <div style="font-size:11.5px;font-weight:700;text-transform:uppercase;color:var(--ink-faint);margin-bottom:10px;">Configured Storage Locations</div>
                <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;">
                  ${wh.locations.map(loc => `
                    <div style="background:var(--surface-alt);border:1px solid var(--line);border-radius:var(--radius);padding:10px 12px;">
                      <div style="font-weight:700;font-size:12.5px;">${esc(loc.name)}</div>
                      <div style="font-size:11px;color:var(--ink-soft);margin-top:2px;">Zone: ${esc(loc.zone)} | Rack: ${esc(loc.rack)} | Bin: ${esc(loc.bin)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function pageCategories() {
    return `
      <div class="page-head">
        <h1 class="page-title">Product Categories</h1>
      </div>
      <div class="table-panel">
        <table class="table">
          <thead><tr><th>Category Name</th><th>Product Count</th></tr></thead>
          <tbody>
            ${State.data.categories.map(c => `
              <tr>
                <td style="font-weight:600;">${esc(c.name)}</td>
                <td>${State.data.products.filter(p => p.category === c.name).length} products</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function pageReorderRules() {
    return `
      <div class="page-head">
        <h1 class="page-title">Reordering Safety Rules</h1>
      </div>
      <div class="table-panel">
        <table class="table">
          <thead>
            <tr><th>Product</th><th>SKU</th><th>Current Stock</th><th>Safety Reorder Level</th><th>Action</th></tr>
          </thead>
          <tbody>
            ${State.data.products.map(p => `
              <tr>
                <td style="font-weight:600;">${esc(p.name)}</td>
                <td class="mono">${esc(p.sku)}</td>
                <td><b>${p.stock}</b> ${esc(p.uom)}</td>
                <td>${p.reorder} ${esc(p.uom)}</td>
                <td>${stockBadge(p)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  let otpFlowState = { email: '', otp: '849201' };

  window.handleLogin = function(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('loginEmail')?.value.trim() || 'aarav.sharma@stocksense.in';
    const isStaff = email.toLowerCase().includes('staff') || email.toLowerCase().includes('vikram');
    State.user = {
      name: isStaff ? 'Vikram Malhotra' : 'Aarav Sharma',
      email: email,
      role: isStaff ? 'Warehouse Staff' : 'Inventory Operations Lead',
      isLoggedIn: true
    };
    saveState();
    showToast('Signed in as ' + State.user.name + ' (' + State.user.role + ')');
    go('/dashboard');
  };

  window.quickLogin = function(role) {
    if (role === 'staff') {
      State.user = {
        name: 'Vikram Malhotra',
        email: 'vikram.m@stocksense.in',
        role: 'Warehouse Staff',
        isLoggedIn: true
      };
    } else {
      State.user = {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@stocksense.in',
        role: 'Inventory Operations Lead',
        isLoggedIn: true
      };
    }
    saveState();
    showToast('Active Persona: ' + State.user.name + ' (' + State.user.role + ')');
    go('/dashboard');
  };

  window.handleSignup = function(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('suName')?.value.trim() || 'Warehouse Specialist';
    const email = document.getElementById('suEmail')?.value.trim() || 'user@stocksense.in';
    const role = document.getElementById('suRole')?.value || 'Inventory Operations Lead';
    State.user = {
      name: name,
      email: email,
      role: role,
      isLoggedIn: true
    };
    saveState();
    showToast('Welcome to StockSense, ' + name + '! Account created.');
    go('/dashboard');
  };

  window.handleSendOtp = function(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('fpEmail')?.value.trim() || State.user.email;
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpFlowState = { email: email, otp: randomOtp };
    showToast('Verification OTP ' + randomOtp + ' sent to ' + email);
    go('/verify-otp');
  };

  window.handleVerifyOtpAndReset = function(e) {
    if (e) e.preventDefault();
    const code = document.getElementById('otpCode')?.value.trim();
    if (!code || code.length < 4) {
      showToast('Please enter the verification OTP code');
      return;
    }
    showToast('Password updated successfully! Welcome back.');
    State.user.isLoggedIn = true;
    saveState();
    setTimeout(() => go('/dashboard'), 400);
  };

  window.logoutUser = function() {
    State.user.isLoggedIn = false;
    saveState();
    showToast('Signed out of StockSense');
    go('/login');
  };

  function pageLogin() {
    return `
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-brand">
            <div class="auth-logo">S</div>
            <div class="auth-title">StockSense Cloud IMS</div>
            <div class="auth-sub">Enterprise Inventory Operations Platform</div>
          </div>

          <div class="auth-card">
            <div class="auth-card-title">Sign In to StockSense</div>
            <div class="auth-card-desc">Enter workplace credentials to access warehouse operations.</div>

            <form onsubmit="handleLogin(event)">
              <div class="auth-field">
                <label class="auth-label">Work Email</label>
                <input type="email" id="loginEmail" class="auth-input" placeholder="e.g. aarav.sharma@stocksense.in" value="${esc(State.user?.email || 'aarav.sharma@stocksense.in')}" required>
              </div>

              <div class="auth-field">
                <div class="auth-label-row">
                  <label class="auth-label">Password</label>
                  <a class="auth-forgot" onclick="go('/forgot-password')">Forgot Password?</a>
                </div>
                <input type="password" id="loginPass" class="auth-input" placeholder="••••••••" value="admin123" required>
              </div>

              <button type="submit" class="auth-btn-primary">Sign In to Dashboard →</button>
            </form>

            <div class="auth-divider">Or quick test with demo personas</div>

            <div class="auth-quick-login">
              <div class="quick-role-btn" onclick="quickLogin('manager')">
                <div>
                  <strong>Aarav Sharma</strong>
                  <div style="font-size:11px;color:var(--ink-faint);">Inventory Operations Lead (Manager)</div>
                </div>
                <span>⚡ 1-Click</span>
              </div>
              <div class="quick-role-btn" onclick="quickLogin('staff')">
                <div>
                  <strong>Vikram Malhotra</strong>
                  <div style="font-size:11px;color:var(--ink-faint);">Warehouse Logistics & Picking Staff</div>
                </div>
                <span>⚡ 1-Click</span>
              </div>
            </div>

            <div class="auth-footer">
              Don't have an account? <a onclick="go('/signup')">Create new account</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function pageSignup() {
    return `
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-brand">
            <div class="auth-logo">S</div>
            <div class="auth-title">StockSense Cloud IMS</div>
            <div class="auth-sub">Enterprise Inventory Operations Platform</div>
          </div>

          <div class="auth-card">
            <div class="auth-card-title">Create StockSense Account</div>
            <div class="auth-card-desc">Join your logistics team to manage warehouse inventory.</div>

            <form onsubmit="handleSignup(event)">
              <div class="auth-field">
                <label class="auth-label">Full Name *</label>
                <input type="text" id="suName" class="auth-input" placeholder="e.g. Ananya Iyer" required>
              </div>

              <div class="auth-field">
                <label class="auth-label">Workplace Email *</label>
                <input type="email" id="suEmail" class="auth-input" placeholder="name@company.in" required>
              </div>

              <div class="auth-field">
                <label class="auth-label">Organizational Role *</label>
                <select id="suRole" class="auth-input">
                  <option value="Inventory Operations Lead">Inventory Operations Lead (Manager)</option>
                  <option value="Warehouse Staff">Warehouse Logistics & Picking Staff</option>
                  <option value="Procurement Specialist">Procurement & Receipts Specialist</option>
                </select>
              </div>

              <div class="auth-field">
                <label class="auth-label">Password *</label>
                <input type="password" id="suPass" class="auth-input" placeholder="Create secure password" required minlength="6" value="staff123">
              </div>

              <button type="submit" class="auth-btn-primary">Create Account & Enter IMS →</button>
            </form>

            <div class="auth-footer">
              Already have an account? <a onclick="go('/login')">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function pageForgotPassword() {
    return `
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-brand">
            <div class="auth-logo">S</div>
            <div class="auth-title">StockSense Cloud IMS</div>
            <div class="auth-sub">Account Recovery & OTP Reset</div>
          </div>

          <div class="auth-card">
            <div class="auth-card-title">Reset Your Password</div>
            <div class="auth-card-desc">We will send a 6-digit One-Time Password (OTP) to verify your identity.</div>

            <form onsubmit="handleSendOtp(event)">
              <div class="auth-field">
                <label class="auth-label">Registered Work Email</label>
                <input type="email" id="fpEmail" class="auth-input" placeholder="e.g. aarav.sharma@stocksense.in" value="${esc(State.user?.email || 'aarav.sharma@stocksense.in')}" required>
              </div>

              <button type="submit" class="auth-btn-primary">Send 6-Digit OTP Code ➔</button>
            </form>

            <div class="auth-footer">
              Remember your credentials? <a onclick="go('/login')">Back to Sign In</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function pageVerifyOtp() {
    return `
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-brand">
            <div class="auth-logo">S</div>
            <div class="auth-title">StockSense Cloud IMS</div>
            <div class="auth-sub">Enter Verification Code</div>
          </div>

          <div class="auth-card">
            <div class="auth-card-title">Enter Verification OTP</div>
            <div class="auth-card-desc">Enter the 6-digit code sent to <b>${esc(otpFlowState.email || 'your email')}</b>.</div>

            <div class="otp-info-pill">
              💡 Demo OTP generated: <b>${otpFlowState.otp || '849201'}</b> (pre-filled for instant testing)
            </div>

            <form onsubmit="handleVerifyOtpAndReset(event)">
              <div class="otp-inputs">
                <input type="text" class="otp-box" maxlength="6" id="otpCode" value="${otpFlowState.otp || '849201'}" style="width:200px;letter-spacing:6px;font-size:22px;">
              </div>

              <div class="auth-field" style="margin-top:16px;">
                <label class="auth-label">New Password *</label>
                <input type="password" id="newPass" class="auth-input" placeholder="Enter new password" required minlength="6" value="newpass123">
              </div>

              <button type="submit" class="auth-btn-primary">Verify OTP & Update Password →</button>
            </form>

            <div class="auth-footer">
              Didn't receive code? <a onclick="handleSendOtp(event)">Resend OTP</a> · <a onclick="go('/login')">Sign In</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function pageProfile() {
    return `
      <div class="page-head">
        <div>
          <h1 class="page-title">User Profile & Access Control</h1>
          <p class="page-sub">Manage active persona, security credentials, and role permissions.</p>
        </div>
      </div>
      <div class="table-panel" style="padding:28px;max-width:560px;">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
          <div class="user-avatar" style="width:52px;height:52px;font-size:20px;">${initials(State.user.name)}</div>
          <div>
            <div style="font-weight:700;font-size:18px;">${esc(State.user.name)}</div>
            <div style="color:var(--primary);font-weight:600;font-size:13px;">${esc(State.user.role)}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;font-size:13px;">
          <div style="background:var(--surface-alt);padding:10px 14px;border-radius:var(--radius);">
            <div style="color:var(--ink-faint);font-size:11px;text-transform:uppercase;">Email</div>
            <div style="font-weight:600;margin-top:2px;">${esc(State.user.email)}</div>
          </div>
          <div style="background:var(--surface-alt);padding:10px 14px;border-radius:var(--radius);">
            <div style="color:var(--ink-faint);font-size:11px;text-transform:uppercase;">Organization</div>
            <div style="font-weight:600;margin-top:2px;">StockSense India Logistics</div>
          </div>
        </div>

        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--line);">
          <div style="font-weight:700;font-size:13px;margin-bottom:8px;">Switch Demo Persona</div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-secondary" style="flex:1;" onclick="quickLogin('manager')">Manager Persona</button>
            <button class="btn btn-secondary" style="flex:1;" onclick="quickLogin('staff')">Staff Persona</button>
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--line);">
          <button class="btn btn-secondary" onclick="go('/forgot-password')">Reset Password via OTP</button>
          <button class="btn btn-danger" onclick="logoutUser()">Sign Out</button>
        </div>
      </div>
    `;
  }

  function pageSettings() {
    return `
      <div class="page-head"><h1 class="page-title">System Settings</h1></div>
      <div class="table-panel" style="padding:24px;max-width:600px;">
        <h3 style="margin-top:0;">StockSense IMS Configuration</h3>
        <p style="color:var(--ink-soft);font-size:13px;margin-bottom:16px;">Manage system currency, notification thresholds, and offline storage persistence.</p>
        <div style="margin-bottom:14px;"><strong>Local Storage Key:</strong> <code class="mono">${STORAGE_KEY}</code></div>
        <button class="btn btn-danger" onclick="resetStateToDefaults()">Reset to Clean Default Seed Data</button>
      </div>
    `;
  }

  window.resetStateToDefaults = function() {
    localStorage.removeItem(STORAGE_KEY);
    State = {
      data: getInitialData(),
      user: { name: 'Aarav Sharma', email: 'aarav.sharma@stocksense.in', role: 'Inventory Operations Lead' },
      theme: 'light'
    };
    saveState();
    location.reload();
  };

  window.runDemoLifecycle = function() {
    const p1 = State.data.products.find(p => p.sku === 'STL-RD-012');
    if (!p1) return;
    p1.stock += 100;
    p1.quantity_on_hand = p1.stock;
    State.data.ledger.unshift({
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ref: 'REC-SIM-1',
      product: p1.id,
      op: 'Receipt',
      source: 'Tata Steelworks Ltd (Vendor)',
      destination: 'Main Logistics Hub (Mumbai)',
      qty: 100,
      balance: p1.stock,
      user: State.user.name
    });

    State.data.ledger.unshift({
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ref: 'TRF-SIM-2',
      product: p1.id,
      op: 'Internal Transfer',
      source: 'Main Logistics Hub (Mumbai)',
      destination: 'Assembly Floor (Bengaluru)',
      qty: 40,
      balance: p1.stock,
      user: State.user.name
    });

    p1.stock -= 20;
    p1.quantity_on_hand = p1.stock;
    State.data.ledger.unshift({
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ref: 'DEL-SIM-3',
      product: p1.id,
      op: 'Delivery',
      source: 'Assembly Floor (Bengaluru)',
      destination: 'Larsen & Toubro Project Site',
      qty: -20,
      balance: p1.stock,
      user: State.user.name
    });

    p1.stock -= 3;
    p1.quantity_on_hand = p1.stock;
    State.data.adjustments.unshift({
      id: 'a' + (++State.data.nextIds.adjustment),
      product: p1.id,
      warehouse: 'wh-mum',
      location: 'loc-m1',
      recorded: p1.stock + 3,
      counted: p1.stock,
      diff: -3,
      reason: 'Physical audit: 3 kg damaged during transit written off',
      date: new Date().toISOString().slice(0, 10),
      user: State.user.name
    });
    State.data.ledger.unshift({
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ref: 'ADJ-SIM-4',
      product: p1.id,
      op: 'Adjustment',
      source: 'Zone A / Rack 01',
      destination: 'Zone A / Rack 01',
      qty: -3,
      balance: p1.stock,
      user: State.user.name
    });

    saveState();
    renderApp();
    showToast('Executed full 4-step lifecycle simulation! All records posted to Stock Ledger.');
  };

  window.openNewActionModal = function() {
    openModal(`
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">+ Add New Item or Stock Operation</h3>
          <button class="header-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body" style="display:flex;flex-direction:column;gap:10px;">
          <div class="quick-card" onclick="closeModal(); openNewProductModal();">
            <div class="quick-ico" style="background:var(--primary-light);color:var(--primary);">📦</div>
            <div>
              <div class="quick-title">Define New Product SKU</div>
              <div class="quick-desc">Add a master item, category, UoM, and initial stock</div>
            </div>
          </div>
          <div class="quick-card" onclick="closeModal(); openNewReceiptModal();">
            <div class="quick-ico" style="background:#ecfdf5;color:#059669;">📥</div>
            <div>
              <div class="quick-title">New Vendor Receipt (Incoming Goods)</div>
              <div class="quick-desc">Receive supplier shipment into warehouse stock</div>
            </div>
          </div>
          <div class="quick-card" onclick="closeModal(); openNewDeliveryModal();">
            <div class="quick-ico" style="background:#eff6ff;color:#2563eb;">🚚</div>
            <div>
              <div class="quick-title">New Customer Delivery (Outgoing Goods)</div>
              <div class="quick-desc">Pick, pack, and ship orders to client project</div>
            </div>
          </div>
          <div class="quick-card" onclick="closeModal(); openNewTransferModal();">
            <div class="quick-ico" style="background:#f5f3ff;color:#7c3aed;">🔄</div>
            <div>
              <div class="quick-title">New Internal Relocation Transfer</div>
              <div class="quick-desc">Move inventory between hubs or bays (company total same)</div>
            </div>
          </div>
          <div class="quick-card" onclick="closeModal(); openNewAdjustmentModal();">
            <div class="quick-ico" style="background:#fffbeb;color:#d97706;">⚖️</div>
            <div>
              <div class="quick-title">New Physical Count Adjustment</div>
              <div class="quick-desc">Reconcile physical stock counts with live difference math</div>
            </div>
          </div>
        </div>
      </div>
    `);
  };

  window.openNewProductModal = function() {
    openModal(`
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">+ Add New Product SKU</h3>
          <button class="header-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div>
              <label class="filter-label">Product Name *</label>
              <input type="text" id="npName" class="input-control" placeholder="e.g. Ergonomic Office Desk">
            </div>
            <div>
              <label class="filter-label">SKU / Code *</label>
              <input type="text" id="npSku" class="input-control mono" placeholder="e.g. FG-DSK-01">
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Category</label>
              <select id="npCategory" class="input-control">
                ${State.data.categories.map(c => `<option>${esc(c.name)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="filter-label">Unit of Measure (UoM)</label>
              <input type="text" id="npUom" class="input-control" value="Units">
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Initial Stock</label>
              <input type="number" id="npStock" class="input-control" value="0">
            </div>
            <div>
              <label class="filter-label">Reorder Safety Level</label>
              <input type="number" id="npReorder" class="input-control" value="20">
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Warehouse Hub</label>
              <select id="npWarehouse" class="input-control">
                ${State.data.warehouses.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="filter-label">Unit Cost (₹)</label>
              <input type="number" id="npCost" class="input-control" value="500">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewProduct()">Create Product</button>
        </div>
      </div>
    `);
  };

  window.submitNewProduct = function() {
    const name = document.getElementById('npName').value.trim();
    const sku = document.getElementById('npSku').value.trim();
    if (!name || !sku) return showToast('Please enter Product Name and SKU');

    const newProd = {
      id: 'p' + State.data.products.length,
      sku: sku,
      product_code: sku,
      name: name,
      product_name: name,
      category: document.getElementById('npCategory').value,
      uom: document.getElementById('npUom').value || 'Units',
      stock: parseInt(document.getElementById('npStock').value, 10) || 0,
      quantity_on_hand: parseInt(document.getElementById('npStock').value, 10) || 0,
      reorder: parseInt(document.getElementById('npReorder').value, 10) || 20,
      warehouse: document.getElementById('npWarehouse').value,
      location: 'loc-m1',
      cost: parseInt(document.getElementById('npCost').value, 10) || 100
    };

    State.data.products.push(newProd);
    saveState();
    closeModal();
    renderApp();
    showToast('Product ' + sku + ' added to catalog.');
  };

  window.quickReorderProduct = function(prodId) {
    const p = findProduct(prodId);
    if (!p) return;
    openNewReceiptModal(p.id);
  };

  window.openNewReceiptModal = function(prefillProdId) {
    openModal(`
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">+ Create Inbound Vendor Receipt</h3>
          <button class="header-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div>
              <label class="filter-label">Supplier / Vendor Name *</label>
              <input type="text" id="nrSupplier" class="input-control" placeholder="e.g. Tata Steelworks Ltd" value="Tata Steelworks Ltd (Jamshedpur)">
            </div>
            <div>
              <label class="filter-label">Receipt Date</label>
              <input type="date" id="nrDate" class="input-control" value="${new Date().toISOString().slice(0, 10)}">
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Destination Warehouse Hub</label>
              <select id="nrWarehouse" class="input-control">
                ${State.data.warehouses.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="filter-label">Product to Receive</label>
              <select id="nrProduct" class="input-control">
                ${State.data.products.map(p => `<option value="${p.id}" ${p.id===prefillProdId?'selected':''}>${esc(p.name)} (${p.sku})</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Quantity Received *</label>
              <input type="number" id="nrQty" class="input-control" value="50">
            </div>
            <div>
              <label class="filter-label">Initial Status</label>
              <select id="nrStatus" class="input-control">
                <option value="Draft">Draft</option>
                <option value="Waiting">Waiting</option>
                <option value="Ready">Ready</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewReceipt()">Create Receipt</button>
        </div>
      </div>
    `);
  };

  window.submitNewReceipt = function() {
    const supplier = document.getElementById('nrSupplier').value.trim();
    const qty = parseInt(document.getElementById('nrQty').value, 10);
    if (!supplier || !qty || qty <= 0) return showToast('Please enter valid supplier and quantity');

    const nextNum = 'REC-' + (++State.data.nextIds.receipt);
    const prodId = document.getElementById('nrProduct').value;
    const p = findProduct(prodId);

    const rec = {
      id: 'r' + State.data.receipts.length,
      number: nextNum,
      reference_no: nextNum,
      supplier: supplier,
      partner_name: supplier,
      operation_type: 'receipt',
      date: document.getElementById('nrDate').value || new Date().toISOString().slice(0, 10),
      warehouse: document.getElementById('nrWarehouse').value,
      status: document.getElementById('nrStatus').value || 'Draft',
      items: [{ product: prodId, qty: qty, uom: p ? p.uom : 'Units' }]
    };

    State.data.receipts.unshift(rec);
    saveState();
    closeModal();
    renderApp();
    showToast('Receipt ' + nextNum + ' created.');
  };

  window.openNewDeliveryModal = function() {
    openModal(`
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">+ Create Outbound Delivery Order</h3>
          <button class="header-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div>
              <label class="filter-label">Client / Destination Project *</label>
              <input type="text" id="ndCustomer" class="input-control" placeholder="e.g. Infosys Campus" value="Larsen & Toubro Project Site (Chennai)">
            </div>
            <div>
              <label class="filter-label">Scheduled Dispatch Date</label>
              <input type="date" id="ndDate" class="input-control" value="${new Date().toISOString().slice(0, 10)}">
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Dispatch Warehouse Hub</label>
              <select id="ndWarehouse" class="input-control">
                ${State.data.warehouses.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="filter-label">Product to Deliver</label>
              <select id="ndProduct" class="input-control">
                ${State.data.products.map(p => `<option value="${p.id}">${esc(p.name)} (${p.stock} available)</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Quantity to Dispatch *</label>
              <input type="number" id="ndQty" class="input-control" value="10">
            </div>
            <div>
              <label class="filter-label">Initial Stage</label>
              <select id="ndStage" class="input-control">
                <option value="Pick">Pick</option>
                <option value="Pack">Pack</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewDelivery()">Create Delivery</button>
        </div>
      </div>
    `);
  };

  window.submitNewDelivery = function() {
    const customer = document.getElementById('ndCustomer').value.trim();
    const qty = parseInt(document.getElementById('ndQty').value, 10);
    if (!customer || !qty || qty <= 0) return showToast('Please enter customer and quantity');

    const nextNum = 'DEL-' + (++State.data.nextIds.delivery);
    const prodId = document.getElementById('ndProduct').value;
    const p = findProduct(prodId);

    const del = {
      id: 'd' + State.data.deliveries.length,
      number: nextNum,
      customer: customer,
      date: document.getElementById('ndDate').value || new Date().toISOString().slice(0, 10),
      warehouse: document.getElementById('ndWarehouse').value,
      status: 'Ready',
      stage: document.getElementById('ndStage').value || 'Pick',
      items: [{ product: prodId, qty: qty, uom: p ? p.uom : 'Units' }]
    };

    State.data.deliveries.unshift(del);
    saveState();
    closeModal();
    renderApp();
    showToast('Delivery order ' + nextNum + ' created.');
  };

  window.openNewTransferModal = function() {
    openModal(`
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">+ Schedule Internal Transfer</h3>
          <button class="header-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div>
              <label class="filter-label">Source Warehouse</label>
              <select id="ntSrcWh" class="input-control">
                ${State.data.warehouses.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="filter-label">Destination Warehouse</label>
              <select id="ntDestWh" class="input-control">
                ${State.data.warehouses.map((w, i) => `<option value="${w.id}" ${i===1?'selected':''}>${esc(w.name)}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-row">
            <div>
              <label class="filter-label">Product</label>
              <select id="ntProduct" class="input-control">
                ${State.data.products.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="filter-label">Transfer Quantity</label>
              <input type="number" id="ntQty" class="input-control" value="25">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewTransfer()">Schedule Transfer</button>
        </div>
      </div>
    `);
  };

  window.submitNewTransfer = function() {
    const qty = parseInt(document.getElementById('ntQty').value, 10);
    if (!qty || qty <= 0) return showToast('Please enter a valid quantity');

    const nextNum = 'TRF-' + (++State.data.nextIds.transfer);
    const trf = {
      id: 't' + State.data.transfers.length,
      number: nextNum,
      sourceWh: document.getElementById('ntSrcWh').value,
      sourceLoc: 'loc-m1',
      destWh: document.getElementById('ntDestWh').value,
      destLoc: 'loc-b1',
      product: document.getElementById('ntProduct').value,
      qty: qty,
      date: new Date().toISOString().slice(0, 10),
      status: 'Ready'
    };

    State.data.transfers.unshift(trf);
    saveState();
    closeModal();
    renderApp();
    showToast('Internal transfer ' + nextNum + ' scheduled.');
  };

  window.openNewAdjustmentModal = function() {
    const p1 = State.data.products[0];
    openModal(`
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">⚖️ Physical Count Stock Adjustment</h3>
          <button class="header-btn" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div>
              <label class="filter-label">Product to Reconcile</label>
              <select id="naProduct" class="input-control" onchange="updateAdjustmentMath()">
                ${State.data.products.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="filter-label">Warehouse Location</label>
              <select id="naWarehouse" class="input-control">
                ${State.data.warehouses.map(w => `<option value="${w.id}">${esc(w.name)}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-row">
            <div>
              <label class="filter-label">Recorded System Stock</label>
              <input type="number" id="naRecorded" class="input-control" value="${p1.stock}" readonly style="background:var(--surface-alt);">
            </div>
            <div>
              <label class="filter-label">Physical Counted Quantity *</label>
              <input type="number" id="naCounted" class="input-control" value="${p1.stock}" oninput="updateAdjustmentMath()">
            </div>
          </div>

          <div class="diff-box">
            <div class="diff-col">
              <div class="diff-lbl">Recorded</div>
              <div class="diff-val" id="naRecVal">${p1.stock}</div>
            </div>
            <div style="font-size:20px;color:var(--ink-faint);">➔</div>
            <div class="diff-col">
              <div class="diff-lbl">Counted</div>
              <div class="diff-val" id="naCntVal">${p1.stock}</div>
            </div>
            <div style="font-size:20px;color:var(--ink-faint);">=</div>
            <div class="diff-col">
              <div class="diff-lbl">Difference</div>
              <div class="diff-val" id="naDiffVal" style="color:var(--ink);">0</div>
            </div>
          </div>

          <div class="form-row-full">
            <label class="filter-label">Reason for Discrepancy *</label>
            <input type="text" id="naReason" class="input-control" placeholder="e.g. Physical audit variance / In-transit damage" value="Routine cycle count reconciliation">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" onclick="submitAdjustment()">Commit Adjustment</button>
        </div>
      </div>
    `);
  };

  window.updateAdjustmentMath = function() {
    const prodId = document.getElementById('naProduct').value;
    const p = findProduct(prodId);
    if (!p) return;

    const recordedInput = document.getElementById('naRecorded');
    const countedInput = document.getElementById('naCounted');
    recordedInput.value = p.stock;

    const recorded = p.stock;
    const counted = parseInt(countedInput.value, 10) || 0;
    const diff = counted - recorded;

    document.getElementById('naRecVal').textContent = recorded;
    document.getElementById('naCntVal').textContent = counted;
    const diffEl = document.getElementById('naDiffVal');
    diffEl.textContent = (diff > 0 ? '+' : '') + diff;
    if (diff === 0) diffEl.style.color = 'var(--ink)';
    else if (diff > 0) diffEl.style.color = 'var(--success)';
    else diffEl.style.color = 'var(--danger)';
  };

  window.submitAdjustment = function() {
    const prodId = document.getElementById('naProduct').value;
    const p = findProduct(prodId);
    const counted = parseInt(document.getElementById('naCounted').value, 10);
    const reason = document.getElementById('naReason').value.trim();

    if (isNaN(counted)) return showToast('Please enter a valid physical count');
    if (!reason) return showToast('Mandatory reason required for adjustments');

    const recorded = p.stock;
    const diff = counted - recorded;
    p.stock = counted;
    p.quantity_on_hand = counted;

    const adjId = 'a' + (++State.data.nextIds.adjustment);
    State.data.adjustments.unshift({
      id: adjId,
      product: p.id,
      warehouse: document.getElementById('naWarehouse').value,
      location: 'loc-m1',
      recorded: recorded,
      counted: counted,
      diff: diff,
      reason: reason,
      date: new Date().toISOString().slice(0, 10),
      user: State.user.name
    });

    State.data.ledger.unshift({
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ref: 'ADJ-' + adjId.slice(1).padStart(3, '0'),
      product: p.id,
      op: 'Adjustment',
      source: 'Physical Count Reconciliation',
      destination: 'Main Hub',
      qty: diff,
      balance: p.stock,
      user: State.user.name
    });

    saveState();
    closeModal();
    renderApp();
    showToast('Adjustment committed! Stock updated to ' + counted + ' ' + p.uom);
  };

  function renderApp() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const clean = currentRoute.split('?')[0];

    if (clean === '/login') {
      appEl.innerHTML = pageLogin() + '<div id="toastWrap" class="toast-wrap"></div>';
      return;
    }
    if (clean === '/signup') {
      appEl.innerHTML = pageSignup() + '<div id="toastWrap" class="toast-wrap"></div>';
      return;
    }
    if (clean === '/forgot-password') {
      appEl.innerHTML = pageForgotPassword() + '<div id="toastWrap" class="toast-wrap"></div>';
      return;
    }
    if (clean === '/verify-otp') {
      appEl.innerHTML = pageVerifyOtp() + '<div id="toastWrap" class="toast-wrap"></div>';
      return;
    }

    let pageHtml = '';

    if (clean === '/dashboard' || clean === '') {
      pageHtml = pageDashboard();
    } else if (clean === '/products') {
      pageHtml = pageProducts();
    } else if (clean.startsWith('/products/')) {
      const id = clean.split('/')[2];
      pageHtml = pageProductDetail(id);
    } else if (clean === '/receipts') {
      pageHtml = pageReceipts();
    } else if (clean === '/deliveries' || clean === '/delivery') {
      pageHtml = pageDeliveries();
    } else if (clean === '/transfers') {
      pageHtml = pageTransfers();
    } else if (clean === '/adjustments') {
      pageHtml = pageAdjustments();
    } else if (clean === '/ledger' || clean === '/history' || clean === '/moves') {
      pageHtml = pageLedger();
    } else if (clean === '/warehouses' || clean === '/locations') {
      pageHtml = pageWarehouses();
    } else if (clean === '/categories') {
      pageHtml = pageCategories();
    } else if (clean === '/reorder-rules' || clean === '/reordering-rules') {
      pageHtml = pageReorderRules();
    } else if (clean === '/profile') {
      pageHtml = pageProfile();
    } else if (clean === '/settings') {
      pageHtml = pageSettings();
    } else {
      pageHtml = pageDashboard();
    }

    appEl.innerHTML = `
      <div class="app-layout">
        ${renderSidebar()}
        <div class="main-wrapper">
          ${renderHeader()}
          <main class="page-body">
            ${pageHtml}
          </main>
        </div>
      </div>
      <div id="modalOverlay" class="modal-overlay" style="display:none;"></div>
      <div id="toastWrap" class="toast-wrap"></div>
    `;
  }

  renderApp();

})();
