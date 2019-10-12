import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, Label, Icon } from 'semantic-ui-react'

export default function Navigation() {
	return (
		<Container>
			<Menu>
				<Menu.Item name="inbox">
					<Link to="/">Home</Link>
				</Menu.Item>

				<Menu.Item name="updates">
					<Link to="/foods">Foods</Link>
				</Menu.Item>
			</Menu>
		</Container>
	)
}
