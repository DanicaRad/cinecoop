import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function MovieCast ({ cast }) {
	const [ showAll, setShowAll ] = useState(false);

	function handleClick (e) {
		e.preventDefault();
		setShowAll(!showAll);
	}

	function partialView () {
		return (
			<div>
				{cast.slice(0, 20).map((c) => (
					<OverlayTrigger
						key={c.id}
						overlay={
							<Tooltip id={c.id}>
								<small>{c.character}</small>
							</Tooltip>
						}
					>
						<button key={c.id} type='button' className='btn btn-sm btn-secondary m-1'>
							{c.name}
						</button>
					</OverlayTrigger>
				))}
				<button type='button' className='btn btn-sm btn-secondary m-1' onClick={handleClick}>
					Show All
				</button>
			</div>
		);
	}

	function fullView () {
		return (
			<div>
				{cast.map((c) => (
					<OverlayTrigger key={c.id} overlay={<Tooltip id={c.id}>{c.character}</Tooltip>}>
						<button key={c.id} type='button' className='btn btn-sm btn-secondary m-1'>
							{c.name}
						</button>
					</OverlayTrigger>
				))}
				<button type='button' className='btn btn-sm btn-secondary m-1' onClick={handleClick}>
					Show Less
				</button>
			</div>
		);
	}

	return <div>{showAll ? fullView() : partialView()}</div>;
}

{
	/* <OverlayTrigger overlay={<Tooltip id={id}>{c.character}</Tooltip>}>
	<button key={c.id} type='button' class='btn btn-sm btn-secondary m-1'>
		{c.name}
	</button>
</OverlayTrigger>

<button
						key={c.id}
						type='button'
						class='btn btn-sm btn-secondary m-1'
						data-bs-toggle='tooltip'
						data-bs-placement='top'
						title={c.character}
					>
						{c.name}
					</button> */
}
