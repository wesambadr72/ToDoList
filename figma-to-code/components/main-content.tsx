export default function MainContent() {
  return (
    <main className="flex-grow container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-secondary p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Feature {item}</h2>
            <p>
              This is a brief description of feature {item}. You can replace this with actual content from your Figma
              design.
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

