import prisma from "../database/database.js";

const badges = [
  {
    title: "First Steps",
    description: "Joined your first community",
    icon: "/uploads/1.png",
  },
  {
    title: "Pathfinder",
    description: "Created the first learning plan",
    icon: "/uploads/2.png",
  },
  {
    title: "Icebreaker",
    description: "Attended the first interview",
    icon: "/uploads/3.png",
  },
  {
    title: "Master Planner",
    description: "Created more than 5 learning plans",
    icon: "/uploads/4.png",
  },
  {
    title: "Connector",
    description: "Joined more than 3 communities",
    icon: "/uploads/5.png",
  },
  {
    title: "Talkaholic",
    description: "Attended more than 5 interviews",
    icon: "/uploads/6.png",
  },
  {
    title: "First Milestone",
    description: "Reached 100 points",
    icon: "/uploads/7.png",
  },
  {
    title: "Career champion",
    description: "Reached 300 points",
    icon: "/uploads/8.png",
  },
  {
    title: "Career legend",
    description: "Reached 1000 points",
    icon: "/uploads/9.png",
  },
  {
    title: "Next Leveler",
    description: "Completed more than 3 learning plans",
    icon: "/uploads/10.png",
  },
  {
    title: "Hello World",
    description: "Used AI in interviews for the first time",
    icon: "/uploads/11.png",
  },
  {
    title: "AI Architect",
    description: "Used AI in learning for the first time",
    icon: "/uploads/12.png",
  },
];

async function main() {
  for (const badge of badges) {
    await prisma.badges.create({
      data: { ...badge },
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
