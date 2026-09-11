import type { ComponentCategory } from './mockComponents';

export interface PreconfiguredBuild {
  id: string;
  name: string;
  type: 'Gaming' | 'Work';
  target: string;
  description: string;
  pros: string[];
  cons: string[];
  componentIds: Partial<Record<ComponentCategory, string>>;
}

export const mockConfigs: PreconfiguredBuild[] = [
  // Gaming Builds
  {
    id: 'config-gaming-1',
    name: 'Esports Champion',
    type: 'Gaming',
    target: 'Valorant / CS2 / League of Legends',
    description: 'Optimized for maximum framerates at 1080p competitive settings.',
    pros: [
      'Extremely high FPS for competitive shooters',
      'Cost-effective performance',
      'Great upgrade path (AM5 platform)'
    ],
    cons: [
      'Not ideal for 4K gaming',
      'Entry-level ray tracing performance'
    ],
    componentIds: {
      CPU: 'cpu-3', // Ryzen 5 7600
      Motherboard: 'mb-3', // Gigabyte B650
      GPU: 'gpu-3', // RTX 4060
      RAM: 'ram-3', // TEAMGROUP 32GB
      Storage: 'storage-2', // Crucial P3 1TB
      PowerSupply: 'psu-1', // RM850x
      Case: 'case-3' // Corsair 4000D
    }
  },
  {
    id: 'config-gaming-2',
    name: '4K Ultra Beast',
    type: 'Gaming',
    target: 'Cyberpunk 2077 / Alan Wake 2 / Starfield',
    description: 'The ultimate gaming rig for uncompromised 4K fidelity and ray tracing.',
    pros: [
      'Flawless 4K gaming performance',
      'Best-in-class CPU for gaming (7800X3D)',
      'Massive VRAM for future-proofing'
    ],
    cons: [
      'Very high power consumption',
      'Premium price tag'
    ],
    componentIds: {
      CPU: 'cpu-1', // 7800X3D
      Motherboard: 'mb-1', // ASUS B650E-F
      GPU: 'gpu-4', // RTX 4090
      RAM: 'ram-2', // G.Skill 64GB
      Storage: 'storage-1', // Samsung 990 Pro 2TB
      PowerSupply: 'psu-2', // EVGA 1000W
      Case: 'case-1' // NZXT H9 Flow
    }
  },
  {
    id: 'config-gaming-3',
    name: '1440p Sweet Spot',
    type: 'Gaming',
    target: 'Call of Duty / Apex Legends / Hogwarts Legacy',
    description: 'The perfect balance of price and performance for 1440p high-refresh gaming.',
    pros: [
      'Excellent 1440p performance',
      'Strong value for money',
      'Good balance of CPU/GPU power'
    ],
    cons: [
      'May struggle with future unoptimized titles at 4K'
    ],
    componentIds: {
      CPU: 'cpu-4', // i5-13600K
      Motherboard: 'mb-2', // MSI Z790
      GPU: 'gpu-5', // RX 7800 XT
      RAM: 'ram-1', // Corsair 32GB
      Storage: 'storage-3', // SN850X 2TB
      PowerSupply: 'psu-1', // RM850x
      Case: 'case-4' // O11 Dynamic EVO
    }
  },

  // Work Builds
  {
    id: 'config-work-1',
    name: 'Video Editing Pro',
    type: 'Work',
    target: 'Premiere Pro / DaVinci Resolve / After Effects',
    description: 'A powerhouse for scrubbing 4K timelines and fast render times.',
    pros: [
      'Intel Quick Sync accelerates video decoding',
      'Ample RAM (64GB) for complex timelines',
      'High CUDA core count for GPU acceleration'
    ],
    cons: [
      'Intel CPU runs hot under load',
      'Large physical footprint'
    ],
    componentIds: {
      CPU: 'cpu-2', // i7-13700K
      Motherboard: 'mb-2', // MSI Z790
      GPU: 'gpu-1', // RTX 4080 Super
      RAM: 'ram-2', // G.Skill 64GB
      Storage: 'storage-1', // Samsung 990 Pro 2TB
      PowerSupply: 'psu-2', // EVGA 1000W
      Case: 'case-2' // Fractal North
    }
  },
  {
    id: 'config-work-2',
    name: '3D Rendering Engine',
    type: 'Work',
    target: 'Blender / Maya / Cinema 4D',
    description: 'Designed for heavy multi-threaded rendering workloads.',
    pros: [
      'Massive 16-core CPU for CPU rendering',
      'High-end GPU for viewport performance and OptiX rendering',
      'Top-tier Gen4 storage speeds'
    ],
    cons: [
      'Expensive investment',
      'Requires excellent cooling environment'
    ],
    componentIds: {
      CPU: 'cpu-5', // 7950X
      Motherboard: 'mb-1', // ASUS B650E-F
      GPU: 'gpu-6', // RTX 4070 Ti Super
      RAM: 'ram-2', // G.Skill 64GB
      Storage: 'storage-1', // Samsung 990 Pro 2TB
      PowerSupply: 'psu-1', // RM850x
      Case: 'case-6' // Phanteks NV7
    }
  },
  {
    id: 'config-work-3',
    name: 'Software Dev & Productivity',
    type: 'Work',
    target: 'VS Code / Docker / General Office',
    description: 'A snappy, responsive system for compiling code and running local containers.',
    pros: [
      'Fast single-core speed for snappy UI and compiles',
      'Good amount of RAM for Docker/VMs',
      'Quiet and unassuming case'
    ],
    cons: [
      'Overkill for basic web browsing',
      'GPU is mostly idle during coding'
    ],
    componentIds: {
      CPU: 'cpu-4', // i5-13600K
      Motherboard: 'mb-2', // MSI Z790
      GPU: 'gpu-3', // RTX 4060
      RAM: 'ram-1', // Corsair 32GB
      Storage: 'storage-2', // Crucial P3 1TB
      PowerSupply: 'psu-1', // RM850x
      Case: 'case-3' // Corsair 4000D
    }
  }
];
