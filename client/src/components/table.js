import React from 'react'
import ReactTable from 'react-table'

export default ({ data, columns, ...props }) => {
	return (
		<ReactTable
			data={data}
			columns={columns}
			resizable={true}
			sortable={true}
		/>
	)
}
