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
	width: 50vw;
	max-height: 80vh;
	overflow: auto;
`

export const Item = styled.div`
	display: flex;
	position: relative;
	padding: 5px 0;

	.remove {
		opacity: 0;
		transition: opacity .3s linear;
		position: absolute;
		width: 100%;
		text-align: center;
		background-color: rgb(172, 0, 0);
		border-radius: 10px;
		cursor: pointer;
		padding: 2px 0;

		&:hover {
			opacity: 1;
		}
	}
`
