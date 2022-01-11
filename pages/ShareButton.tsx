import { CopyToClipboard } from 'react-copy-to-clipboard'

const ShareButton = ({
    label,
    text,
    title,
}: {
    label: string
    text: string
    title: string
}) => {
    if (!navigator.share) {
        return (
            <CopyToClipboard text={title + ' ' + text}>{label}</CopyToClipboard>
        )
    }

    const url = document.location.href
    const shareDetails = { url, title, text }

    const handleSharing = async () => {
        try {
            await navigator.share(shareDetails)
        } catch (error) {
            console.log(`Oops! I couldn't share to the world because: ${error}`)
        }
    }
    return (
        <button className="btn btn-outline m-2" onClick={handleSharing}>
            {label}
        </button>
    )
}
export default ShareButton
