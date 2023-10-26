export default function Error ({ error }) {
    return (
        <div>
            { error && error.error }
        </div>
    )
}