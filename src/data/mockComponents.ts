export type ComponentCategory = 'CPU' | 'Motherboard' | 'GPU' | 'RAM' | 'Storage' | 'PowerSupply' | 'Case';

export interface PCComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  price: number;
  image?: string;
  specs: Record<string, string>;
  compatibilityTags: string[];
  stock: number;
}

export const mockComponents: PCComponent[] = [
  // CPUs
  {
    id: 'cpu-1',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'CPU',
    price: 399.99,
    specs: { Cores: '8', Threads: '16', Socket: 'AM5', BaseClock: '4.2 GHz' },
    compatibilityTags: ['AM5', 'DDR5'],
    stock: 15,
  },
  {
    id: 'cpu-2',
    name: 'Intel Core i7-13700K',
    category: 'CPU',
    price: 409.99,
    specs: { Cores: '16', Threads: '24', Socket: 'LGA1700', BaseClock: '3.4 GHz' },
    compatibilityTags: ['LGA1700', 'DDR5', 'DDR4'],
    stock: 8,
  },
  {
    id: 'cpu-3',
    name: 'AMD Ryzen 5 7600',
    category: 'CPU',
    price: 229.99,
    specs: { Cores: '6', Threads: '12', Socket: 'AM5', BaseClock: '3.8 GHz' },
    compatibilityTags: ['AM5', 'DDR5'],
    stock: 20,
  },

  // Motherboards
  {
    id: 'mb-1',
    name: 'ASUS ROG Strix B650E-F',
    category: 'Motherboard',
    price: 269.99,
    specs: { Socket: 'AM5', FormFactor: 'ATX', Memory: 'DDR5' },
    compatibilityTags: ['AM5', 'DDR5', 'ATX'],
    stock: 12,
  },
  {
    id: 'mb-2',
    name: 'MSI MAG Z790 TOMAHAWK WIFI',
    category: 'Motherboard',
    price: 259.99,
    specs: { Socket: 'LGA1700', FormFactor: 'ATX', Memory: 'DDR5' },
    compatibilityTags: ['LGA1700', 'DDR5', 'ATX'],
    stock: 5,
  },

  // GPUs
  {
    id: 'gpu-1',
    name: 'NVIDIA GeForce RTX 4080 Super',
    category: 'GPU',
    price: 999.99,
    specs: { VRAM: '16GB GDDR6X', Length: '310mm', Power: '320W' },
    compatibilityTags: ['PCIe 4.0'],
    stock: 3,
  },
  {
    id: 'gpu-2',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'GPU',
    price: 949.99,
    specs: { VRAM: '24GB GDDR6', Length: '287mm', Power: '355W' },
    compatibilityTags: ['PCIe 4.0'],
    stock: 7,
  },
  {
    id: 'gpu-3',
    name: 'NVIDIA GeForce RTX 4060',
    category: 'GPU',
    price: 299.99,
    specs: { VRAM: '8GB GDDR6', Length: '240mm', Power: '115W' },
    compatibilityTags: ['PCIe 4.0'],
    stock: 25,
  },

  // RAM
  {
    id: 'ram-1',
    name: 'Corsair Vengeance 32GB (2 x 16GB)',
    category: 'RAM',
    price: 114.99,
    specs: { Speed: '6000MHz', Type: 'DDR5', Latency: 'CL30' },
    compatibilityTags: ['DDR5'],
    stock: 40,
  },
  {
    id: 'ram-2',
    name: 'G.Skill Trident Z5 RGB 64GB (2 x 32GB)',
    category: 'RAM',
    price: 219.99,
    specs: { Speed: '6400MHz', Type: 'DDR5', Latency: 'CL32' },
    compatibilityTags: ['DDR5'],
    stock: 15,
  },

  // Storage
  {
    id: 'storage-1',
    name: 'Samsung 990 Pro 2TB',
    category: 'Storage',
    price: 169.99,
    specs: { Type: 'NVMe M.2', Gen: 'PCIe 4.0', ReadSpeed: '7450 MB/s' },
    compatibilityTags: ['M.2', 'PCIe 4.0'],
    stock: 50,
  },
  {
    id: 'storage-2',
    name: 'Crucial P3 Plus 1TB',
    category: 'Storage',
    price: 64.99,
    specs: { Type: 'NVMe M.2', Gen: 'PCIe 4.0', ReadSpeed: '5000 MB/s' },
    compatibilityTags: ['M.2', 'PCIe 4.0'],
    stock: 30,
  },

  // Power Supplies
  {
    id: 'psu-1',
    name: 'Corsair RM850x (2021)',
    category: 'PowerSupply',
    price: 134.99,
    specs: { Wattage: '850W', Rating: '80+ Gold', Modular: 'Full' },
    compatibilityTags: ['ATX'],
    stock: 18,
  },
  {
    id: 'psu-2',
    name: 'EVGA SuperNOVA 1000 G6',
    category: 'PowerSupply',
    price: 179.99,
    specs: { Wattage: '1000W', Rating: '80+ Gold', Modular: 'Full' },
    compatibilityTags: ['ATX'],
    stock: 10,
  },

  // Cases
  {
    id: 'case-1',
    name: 'NZXT H9 Flow',
    category: 'Case',
    price: 159.99,
    specs: { Type: 'Mid Tower', MotherboardSupport: 'ATX, Micro-ATX, Mini-ITX' },
    compatibilityTags: ['ATX'],
    stock: 12,
  },
  {
    id: 'case-2',
    name: 'Fractal Design North',
    category: 'Case',
    price: 139.99,
    specs: { Type: 'Mid Tower', MotherboardSupport: 'ATX, Micro-ATX, Mini-ITX' },
    compatibilityTags: ['ATX'],
    stock: 5,
  }
];
