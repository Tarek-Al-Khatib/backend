import prisma from "../database/database.js";

const badges = [];

async function main() {
  for (const badge of badges) {
    await prisma.badges.upsert({
      where: { title: badge.title },
      update: {},
      create: badge,
    });
  }
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
