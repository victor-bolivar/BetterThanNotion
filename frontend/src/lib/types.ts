export type TNote = {
    _id: string // TODO could be improved if id follows a certain structure like ${string}-${string}-${string}
    title: string
    content: string
    archived: boolean
}