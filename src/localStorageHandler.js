export const values = () => JSON.parse(localStorage.getItem("todo") || "[]")

export const add = value => {
	const storage = values()
	storage.push(value)
	localStorage.setItem("todo", JSON.stringify(storage))
}

export const remove = value => {
	const storage = values()
	const index = storage.indexOf(value)
	storage.splice(index, 1)
	localStorage.setItem("todo", JSON.stringify(storage))
}
