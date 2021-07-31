import React from 'react';
import Link from 'next/link';
import { Card, Button } from 'semantic-ui-react';
import factoryContract from '../ethereum/factory';

function renderCampaigns(campaigns) {
	const items = campaigns.map((address) => {
		return {
			header: address,
			description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
			fluid: true,
		};
	});

	return <Card.Group items={items} />;
}

const Home = ({ campaigns }) => {
	return (
		<div>
			<h3>Open Campaigns</h3>
			<Link href="/campaigns/new">
				<Button floated="right" content="Create Campaign" icon="add circle" primary />
			</Link>
			{renderCampaigns(campaigns)}
		</div>
	);
};

export async function getServerSideProps(context) {
	const campaigns = await factoryContract.methods.getCampaigns().call();
	return {
		props: {
			campaigns,
		}, // will be passed to the page component as props
	};
}

export default Home;
