// Central data for Arhamy OS — edit identity, links, skills & projects here.

export type AppId = 'about' | 'projects' | 'blog';

export type DockApp = {
	id: AppId;
	name: string;
	icon: 'about' | 'projects' | 'blog';
};

export type DockLink = {
	name: string;
	url: string;
	icon: 'spotify' | 'github' | 'linkedin' | 'instagram';
};

export type Project = {
	title: string;
	period?: string;
	description: string;
	tags: string[];
	links?: { label: string; url: string }[];
};

export type SkillGroup = {
	group: string;
	items: string[];
};

export const profile = {
	name: 'Muhammad Ulul Arhamy',
	displayName: ['MUHAMMAD', 'ULUL ARHAMY'],
	credentials: 'S.T.',
	roles: [
		'Full Stack Developer | Cloud & DevOps | Cybersecurity & AI/ML Enthusiast',
		'Full Stack Developer',
		'Cloud & DevOps Engineer',
		'Cybersecurity & AI/ML Enthusiast'
	],
	tagline: 'Full Stack Developer | Cloud & DevOps | Cybersecurity & AI/ML Enthusiast',
	summary:
		'Sarjana Teknik Komputer (Universitas Syiah Kuala). Membangun aplikasi web full-stack yang modern, cepat, dan aman — dari front-end hingga infrastruktur cloud. Founder & Leader AWS Learning Community Aceh. Pengalaman riset Deep Learning / Computer Vision (deteksi 7 ekspresi wajah berbasis MobileNet + Transfer Learning, TensorFlow/Keras, pra-proses CLAHE).',
	location: 'Krueng Barona Jaya, Aceh Besar, Aceh',
	email: 'arhamy131002@gmail.com',
	phone: '0823-6151-4612',
	website: 'github.com/humane15',
	cvUrl: '/cv-muhammad-ulul-arhamy.pdf',
	cvDownloadName: 'CV-Muhammad-Ulul-Arhamy.pdf',
	spotifyUrl: 'https://open.spotify.com/',

	// Marquee ticker in the hero
	skills: [
		'Svelte',
		'SvelteKit',
		'React',
		'Node.js',
		'Hono',
		'TypeScript',
		'Python',
		'FastAPI',
		'PostgreSQL',
		'MySQL',
		'Prisma',
		'Drizzle ORM',
		'AWS',
		'Nginx',
		'Docker',
		'PM2',
		'Linux',
		'TensorFlow',
		'Keras',
		'MobileNet',
		'OSINT',
		'Cybersecurity'
	],

	// Grouped skills for the About window
	skillGroups: [
		{
			group: 'Languages',
			items: ['JavaScript / TypeScript', 'Python', 'SQL', 'Bash']
		},
		{
			group: 'Frontend',
			items: ['React', 'Svelte / SvelteKit', 'Vite', 'TailwindCSS']
		},
		{
			group: 'Backend',
			items: ['Node.js', 'Hono', 'Express', 'FastAPI', 'REST API']
		},
		{
			group: 'Databases & ORM',
			items: ['PostgreSQL', 'MySQL / MariaDB', 'Prisma', 'Drizzle ORM']
		},
		{
			group: 'Cloud & DevOps',
			items: ['AWS (EC2/S3/VPC)', 'Nginx', 'PM2', 'Docker', 'Linux', 'Git / GitHub']
		},
		{
			group: 'AI / ML',
			items: ['TensorFlow', 'Keras', 'MobileNet', 'CNN / Transfer Learning']
		},
		{
			group: 'Security',
			items: ['OSINT', 'Cybersecurity dasar']
		}
	] satisfies SkillGroup[],

	achievements: [
		'Founder & Leader — AWS Learning Community Aceh',
		'Sarjana Teknik Komputer — Universitas Syiah Kuala',
		'Riset Deep Learning: deteksi 7 ekspresi wajah (MobileNet + Transfer Learning)',
		'Deploy & maintain produksi di VPS (Nginx + PM2 + SSL)'
	],

	dockApps: [
		{ id: 'about', name: 'About', icon: 'about' },
		{ id: 'projects', name: 'Projects', icon: 'projects' },
		{ id: 'blog', name: 'Blog', icon: 'blog' }
	] satisfies DockApp[],

	dockLinks: [
		{ name: 'Spotify', url: 'https://open.spotify.com/', icon: 'spotify' },
		{ name: 'GitHub', url: 'https://github.com/humane15', icon: 'github' },
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/muhammad-ulul-arhamy/',
			icon: 'linkedin'
		},
		{ name: 'Instagram', url: 'https://www.instagram.com/ulul_arhamy2/', icon: 'instagram' }
	] satisfies DockLink[],

	projects: [
		{
			title: 'Sistem Informasi Pesantren (MBU)',
			period: 'Full-stack · Produksi',
			description:
				'Aplikasi full-stack untuk pesantren: panel admin (berita, galeri, data santri), sistem pembayaran SPP, dan Open Graph dinamis. Dideploy di VPS dengan Nginx + PM2, domain, dan SSL.',
			tags: ['React', 'TypeScript', 'Node.js / Express', 'Prisma', 'MySQL', 'VPS'],
			links: [{ label: 'Live site', url: 'https://info.mahadbabululum.com' }]
		},
		{
			title: 'Deteksi Ekspresi Wajah (Skripsi)',
			period: 'Deep Learning · Computer Vision',
			description:
				'Model deteksi 7 ekspresi wajah untuk konteks pendidikan menggunakan MobileNet family + Transfer Learning (TensorFlow/Keras), pra-proses CLAHE, dievaluasi dengan akurasi, precision, dan recall.',
			tags: ['Python', 'TensorFlow', 'Keras', 'MobileNet', 'Computer Vision']
		},
		{
			title: 'Inventory / Stock Management',
			period: 'Backend · Type-safe',
			description:
				'Backend manajemen stok dengan Hono + Drizzle ORM (SQLite/PostgreSQL): tabel kategori, item, dan transaksi stok dengan transaksi atomik serta validasi Zod.',
			tags: ['Hono', 'Drizzle ORM', 'TypeScript', 'Zod', 'PostgreSQL']
		}
	] satisfies Project[]
};

export type Profile = typeof profile;
