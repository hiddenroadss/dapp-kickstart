import { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useRouter, userRouter } from 'next/router';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

const NewCampaign = () => {
	const [minimumContribution, setMinimumContribution] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage('');
		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods.createCampaign(minimumContribution).send({
				from: accounts[0],
			});
			router.push('/');
		} catch (err) {
			setErrorMessage(err.message);
		}
		setLoading(false);
	};

	return (
		<>
			<h3>Create New Campaign</h3>
			<Form error={!!errorMessage} onSubmit={onSubmit}>
				<Form.Field>
					<label>Minimum Contribution</label>
					<Input
						label="wei"
						labelPosition="right"
						value={minimumContribution}
						onChange={(e) => setMinimumContribution(e.target.value)}
					/>
				</Form.Field>
				<Message content={errorMessage} header="Oops!" error />
				<Button loading={loading} primary>
					Create!
				</Button>
			</Form>
		</>
	);
};

export default NewCampaign;
