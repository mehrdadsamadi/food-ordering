export default function MessageBox({children, type = 'success'}) {

    return (
        <div className={`text-center p-4 rounded-lg border mb-4 ${type}`}>{children}</div>
    )
}