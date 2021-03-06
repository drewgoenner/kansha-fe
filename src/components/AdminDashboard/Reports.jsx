import React from 'react';
import MostRecog from './reports/MostRecog';
import MostRecogGiven from './reports/MostRecogGiven';

export default function Reports() {
	return (
		<div className="reports">
			<h1 className="admin-title">Reports</h1>
			<main>
				<section className="container-participation-donut-chart"></section>
				<section className="container-thanked-leaderboard">
					<MostRecog />
				</section>
				<section className="container-team-engagement"></section>
				<section className="container-thankful-engagement">
					<MostRecogGiven />
				</section>
			</main>
		</div>
	);
}
