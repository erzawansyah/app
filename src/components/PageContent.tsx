const PageContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main className="flex-grow bg-gray-light px-4 py-6 w-full">
            <div className="container mx-auto">
                {children}
            </div>
        </main>
    )
}

export default PageContent
