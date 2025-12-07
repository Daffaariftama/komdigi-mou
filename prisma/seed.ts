import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const statuses = [
    "Inisiasi",
    "Proses Penyusunan Naskah",
    "Implementasi",
    "Sudah Disahkan",
  ];


  console.log("Seeding Negara...");
  const countries = [
    { id: "IDN", name: "Indonesia" },
    { id: "SGP", name: "Singapore" },
    { id: "MYS", name: "Malaysia" },
    { id: "THA", name: "Thailand" },
    { id: "VNM", name: "Vietnam" },
    { id: "PHL", name: "Philippines" },
    { id: "USA", name: "United States" },
    { id: "CHN", name: "China" },
    { id: "JPN", name: "Japan" },
    { id: "KOR", name: "South Korea" },
    { id: "AUS", name: "Australia" },
    { id: "GBR", name: "United Kingdom" },
  ];

  for (const country of countries) {
    await prisma.negara.upsert({
      where: { id_negara: country.id },
      update: {},
      create: {
        id_negara: country.id,
        nama_negara: country.name,
      },
    });
  }

  console.log("Seeding Mitra...");
  const partners = [
    "Google",
    "Microsoft",
    "Amazon Web Services",
    "Huawei",
    "ZTE",
    "Ericsson",
    "Nokia",
    "Ministry of Communications (Singapore)",
    "MCMC (Malaysia)",
    "Department of State (USA)",
    "ITU (International Telecommunication Union)",
  ];

  for (const partner of partners) {
    await prisma.mitra.upsert({
      where: { id_counterpart: partners.indexOf(partner) + 1 }, // Simple ID generation
      update: {},
      create: {
        nama_counterpart: partner,
      },
    });
  }

  console.log("Seeding Status...");
  for (const status of statuses) {
    await prisma.status.upsert({
      where: { id_status_naskah: statuses.indexOf(status) + 1 }, // Assuming ID starts at 1
      update: {},
      create: {
        nama_status: status,
      },
    });
  }

  console.log("Seeding Admin User...");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
