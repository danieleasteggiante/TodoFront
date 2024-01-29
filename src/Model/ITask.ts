export default interface Task {
    id : number
    description : string
    completed : boolean
    userId : number
    createdAt : Date
    updatedAt : Date
    children : Task[]
}