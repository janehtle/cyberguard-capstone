server: {
	proxy: process.env.NODE_ENV === 'development'
		? {
				'/api': {
					target: 'http://localhost:5000',
					changeOrigin: true,
					secure: false,
				},
		  }
		: undefined;
}
