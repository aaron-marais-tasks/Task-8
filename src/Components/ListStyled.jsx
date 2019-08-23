import styled from "styled-components"

export const InputPrompter = styled.div`
	width: 50vw;
	height: 20vh;
	font-size: 32px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;

	input {
		padding: 5px;
		font-size: 22px;
		width: 50vw;
	}
`

export const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 22px;
	width: 55vw;
	max-height: 80vh;
	overflow: auto;
	transform: translateX(-5.5vw);

	.remove {
		padding: 0 .5vw;
		margin: 0 .5vw;
		background-color: rgba(255,0,0,.5);
		border-radius: 10px;
		opacity: 0;
		transition: opacity .3s linear;
	}

	&:hover .remove {
		opacity: 1;
	}
`

export const Item = styled.div`
	display: flex;
`
