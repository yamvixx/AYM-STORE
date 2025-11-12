// ===============================
// 🛍️ Base de productos por serie (con precios por grado y estado)
// ===============================
const products = [
  {
    id: 1,
    serie: "12",
    name: "iPhone 12",
    description: "Pantalla OLED Super Retina XDR y chip A14 Bionic.",
    image: "imagenes/ip12.webp",
    colors: ["Negro", "Blanco", "Azul"],
    estado: "disponible",
    prices: {
      "64GB": { A: 1140, B: 990 },
    }
  },
  {
    id: 2,
    serie: "12",
    name: "iPhone 12 mini",
    description: "Chiquito pero poderoso",
    image: "imagenes/ip12mini.webp",
    colors: ["Negro", "Blanco", "Azul"],
    estado: "disponible",
    prices: {
      "64GB": { A: 890, B: 790 },
      "128GB": { A: 990, B: 890 }
    }
  },
  {
    id: 3,
    serie: "13",
    name: "iPhone 13 Mini",
    description: "Chip A15 Bionic y batería de larga duración.",
    image: "imagenes/ip13mini.webp",
    colors: ["Rosa", "Negro", "Blanco"],
    estado: "agotado",
    prices: {
      "128GB": { A: 1290, B: 1190 }
    }
  },
  {
    id: 4,
    serie: "13",
    name: "iPhone 13 Pro Max",
    description: "Pantalla ProMotion y cámaras mejoradas.",
    image: "imagenes/ip13pr.webp",
    colors: ["Grafito", "Sierra Blue", "Oro"],
    estado: "agotado",
    prices: {
      "128GB": { A: 2350}
    }
  },
  {
    id: 5,
    serie: "14",
    name: "iPhone 14",
    description: "Rendimiento avanzado y gran autonomía.",
    image: "imagenes/ip14.webp",
    colors: ["Azul", "Morado", "Rojo"],
    estado: "disponible",
    prices: {
      "128GB": { A: 1690, B: 1590 }
    }
  },

  {
    id: 6,
    serie: "14",
    name: "iPhone 14 plus",
    description: "El plus mi hermano",
    image: "imagenes/ip14pl.webp",
    colors: ["Azul", "Morado", "Rojo"],
    estado: "disponible",
    prices: {
      "128GB": { A: 1890, B: 1690 }
    }
  },
  

  {
    id: 7,
    serie: "14",
    name: "iPhone 14 Pro",
    description: "Dynamic Island, A16 Bionic y cámara de 48MP.",
    image: "imagenes/ip14pro.webp",
    colors: ["Negro Espacial", "Plata", "Oro"],
    estado: "disponible",
    prices: {
      "128GB": { A: 2390, B: 2290 },
      "256GB": { A: 2540 }
    }
  }
];

// ===============================
// 🧩 Renderizar productos dinámicamente
// ===============================
function renderProducts() {
  ["serie12", "serie13", "serie14"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

  products.forEach(product => {
    const container = document.getElementById(`serie${product.serie}`);
    if (!container) return;

    const storages = Object.keys(product.prices);
    const estadoClass = product.estado === "agotado" ? "agotado" : "disponible";
    const estadoTexto = product.estado === "agotado" ? "AGOTADO" : "Disponible";
    const estadoIcon = product.estado === "agotado" ? "❌" : "✅";

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="estado-badge ${estadoClass}">
        ${estadoIcon} ${estadoTexto}
      </div>
      <img src="${product.image}" alt="${product.name}" class="product-img" />
      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.description}</p>

      <label>Grado:</label>
      <select class="grade-select" data-id="${product.id}" ${product.estado === "agotado" ? "disabled" : ""}>
        <option value="A">A (Como nuevo)</option>
        <option value="B">B (Detalles leves)</option>
      </select>

      <label>Almacenamiento:</label>
      <select class="storage-select" data-id="${product.id}" ${product.estado === "agotado" ? "disabled" : ""}>
        ${storages.map(s => `<option value="${s}">${s}</option>`).join("")}
      </select>

      <label>Color:</label>
      <select class="color-select" ${product.estado === "agotado" ? "disabled" : ""}>
        ${product.colors.map(c => `<option>${c}</option>`).join("")}
      </select>

      <p class="price" id="price-${product.id}"></p>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll(".grade-select, .storage-select").forEach(select =>
    select.addEventListener("change", updatePrices)
  );

  updatePrices();
}

// ===============================
// 💰 Calcular precios según grado y almacenamiento
// ===============================
function updatePrices() {
  products.forEach(product => {
    const gradeEl = document.querySelector(`.grade-select[data-id="${product.id}"]`);
    const storageEl = document.querySelector(`.storage-select[data-id="${product.id}"]`);
    if (!gradeEl || !storageEl) return;

    const grade = gradeEl.value;
    const storage = storageEl.value;
    const priceEl = document.getElementById(`price-${product.id}`);

    const price = product.prices?.[storage]?.[grade];
    if (price) {
      priceEl.textContent = `S/ ${price.toFixed(2)}`;
    } else {
      priceEl.textContent = "—";
    }
  });
}

// ===============================
// 📅 Menú responsive + año en footer
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  const btnMenu = document.getElementById("btn-menu");
  const nav = document.getElementById("nav");
  if (btnMenu && nav) {
    btnMenu.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
