export default async function User() {
    await new Promise(resolve => setTimeout(resolve, 8000))
    return(
        <div>User</div>
    )
}