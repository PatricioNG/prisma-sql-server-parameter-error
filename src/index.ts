import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const SEED_ROW_COUNT = 2200;

const seedDB = async () => {
	let count = 1;

	const authorsInsertData = [];
	const postsInsertData = [];

	//Seed data
	while (count <= SEED_ROW_COUNT) {
		authorsInsertData.push({
			firstName: 'FIRST_NAME',
			lastName: 'LAST_NAME',
		});

		postsInsertData.push({
			authorsId: count,
			description: 'DESCRIPTION',
			title: 'TITLE',
		});
		count++;
	}

	await prisma.authors.createMany({
		data: authorsInsertData,
	});

	await prisma.posts.createMany({
		data: postsInsertData,
	});
};

const Main = async () => {
	//Seed command will insert 2200
	//records into the table - prisma handles this just
	//fine by splitting up the inserts
	await seedDB();

	//Attempting to pull back 2200 with an
	//`include` statement will throw an error
	//due to the amount of parameters - it will attempt to
	//send a query with 2200 parameters instead of respecting the
	//2100 limit on SQL Server
	await prisma.authors.findMany({
		include: {
			Posts: true,
		},
	});
};

Main();
