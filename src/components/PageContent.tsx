const PageContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main className="flex-grow bg-gray-light px-6 py-8">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
    )
}

export default PageContent
