This is a WHOIS Lookup app built with Next.js.

## Why Next?

I used Next instead of building a separate frontend and backend because the project is small and doesn't require a separate backend. It would also take additional development time to build a separate frontend and backend.

But, if I were to build a separate backend, I would have used Express. Same route but with additional setup.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## Notes

If you're running this on Mac and get an error about the port already being in use, you can try running the development server with a different port:

```bash
npm run dev -- -p 5001
```

Or, you can try disabling the AirPlay Receiver in your device's settings. It usually runs on port 5000.