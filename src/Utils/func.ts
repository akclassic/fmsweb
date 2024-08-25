export const getBaseAPIUrl = (): string => {
    return process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL: "http://localhost:7072";
}

export const handleDownload = async (url: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'invoice.jpg'); // You can dynamically generate this name if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading the file', error);
    }
};