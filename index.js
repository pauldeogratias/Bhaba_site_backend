// // import dotenv from 'dotenv';
// // import express from 'express';
// // import cors from 'cors';
// // import { MeiliSearch } from 'meilisearch';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // // Load environment variables from .env.local
// // dotenv.config({ path: '.env.local' });

// // // Debug: Log loaded environment variables
// // console.log('Environment Configuration:');
// // console.log('MEILI_HOST:', process.env.MEILI_HOST ? '***' : 'NOT FOUND');
// // console.log('MEILI_API_KEY:', process.env.MEILI_API_KEY ? '***' : 'NOT FOUND');
// // console.log('PORT:', process.env.PORT || '5000 (default)');

// // // Verify required environment variables
// // if (!process.env.MEILI_HOST) {
// //   console.error('FATAL ERROR: MEILI_HOST is not defined in .env.local');
// //   process.exit(1);
// // }

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Initialize MeiliSearch client with error handling
// // let client;
// // let index;
// // try {
// //   client = new MeiliSearch({
// //     host: process.env.MEILI_HOST,
// //     apiKey: process.env.MEILI_API_KEY || '',
// //       requestConfig: {
// //     maxTotalHits: 10000 // Adjust as needed
// //   }
// //   });
  
// //   index = client.index('vendor_store_data');
// //   console.log('MeiliSearch client initialized successfully');
// // } catch (error) {
// //   console.error('Failed to initialize MeiliSearch client:', error);
// //   process.exit(1);
// // }

// // function transformFirebaseUrlToImageKit(firebaseUrl) {
// //   if (!firebaseUrl) return '';
  
// //   try {
// //     const urlObj = new URL(firebaseUrl);
// //     const encodedPath = urlObj.pathname.split('/o/')[1];
// //     if (!encodedPath) return firebaseUrl;

// //     const decodedPath = decodeURIComponent(encodedPath);
// //     return `https://ik.imagekit.io/3n0rrhtkz/firebase_files/${decodedPath}`;
// //   } catch (error) {
// //     console.error('Error transforming Firebase URL:', error);
// //     return firebaseUrl;
// //   }
// // }

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Health check endpoint
// // app.get('/health', (_req, res) => {
// //   res.status(200).json({ status: 'healthy' });
// // });

// // // Get all vendor stores
// // app.get("/vendors", async (_req, res) => {
// //   try {
// //     const searchResult = await index.search('', { limit: 10000 });
// //     const vendorsMap = new Map();
    
// //     searchResult.hits.forEach(hit => {
// //       if (!vendorsMap.has(hit.vendorId)) {
// //         vendorsMap.set(hit.vendorId, {
// //           id: hit.vendorId,
// //           store_name: hit.vendor_name,
// //           store_logo: hit.store_logo
// //         });
// //       }
// //     });

// //     res.json(Array.from(vendorsMap.values()));
// //   } catch (error) {
// //     console.error("Error getting vendors:", error);
// //     res.status(500).json({ error: "Failed to fetch vendors" });
// //   }
// // });


// // // Ensure all responses are JSON
// // app.use((_req, res, next) => {
// //   res.setHeader('Content-Type', 'application/json');
// //   next();
// // });

// // // Error handling middleware
// // app.use((err, _req, res, _next) => {
// //   console.error('Error:', err);
// //   res.status(500).json({ 
// //     error: 'Internal Server Error',
// //     message: err.message 
// //   });
// // });


// // // Get specific vendor store by ID
// // app.get("/vendors/:vendorId", async (req, res) => {
// //   try {
// //     const { vendorId } = req.params;
// //     const searchResult = await index.search('', {
// //       limit: 10000
// //     });
    
// //     // Find vendor by ID
// //     const vendor = searchResult.hits.find(hit => hit.vendorId === vendorId);
    
// //     if (!vendor) {
// //       return res.status(404).json({ error: "Vendor not found" });
// //     }
    
// //     res.json({
// //       id: vendor.vendorId,
// //       store_name: vendor.vendor_name,
// //       store_logo: vendor.store_logo
// //     });
// //   } catch (error) {
// //     console.error("Error getting vendor:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Get categories for a specific vendor
// // app.get("/vendors/:vendorId/categories", async (req, res) => {
// //   try {
// //     const { vendorId } = req.params;
// //     const searchResult = await index.search('', {
// //       limit: 10000
// //     });
    
// //     // Filter by vendorId and extract unique categories
// //     const categoriesMap = new Map();
// //     searchResult.hits.forEach(hit => {
// //       if (hit.vendorId === vendorId && !categoriesMap.has(hit.categoryId)) {
// //         categoriesMap.set(hit.categoryId, {
// //           id: hit.categoryId,
// //           category_name: hit.category_name
// //         });
// //       }
// //     });

// //     const categories = Array.from(categoriesMap.values());
// //     res.json(categories);
// //   } catch (error) {
// //     console.error("Error getting categories:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Get products for a specific vendor and category
// // app.get("/vendors/:vendorId/categories/:categoryId/products", async (req, res) => {
// //   try {
// //     const { vendorId, categoryId } = req.params;
// //     const searchResult = await index.search('', {
// //       limit: 10000
// //     });
    
// //     // Filter products by vendorId and categoryId
// //     const products = searchResult.hits
// //       .filter(hit => hit.vendorId === vendorId && hit.categoryId === categoryId)
// //       .map(hit => ({
// //         id: hit.productId,
// //         productId: hit.productId,
// //         product_name: hit.product_name,
// //         price: hit.price,
// //         description: hit.description,
// //         discount: hit.discount,
// //         details: hit.details,
// //         tier_pricing: hit.tier_pricing,
// //        // product_images: hit.product_images,
// //        product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
// //       //product_images: ["https://i.ibb.co/cm382jK/images-2.jpg"],
// //         //product_video_url: hit.product_video_url,
// //         mobile_number: hit.mobile_number,
// //         isAvailable: hit.isAvailable,
// //         moq: hit.moq,
// //         added_at: hit.added_at
// //       }));
    
// //     res.json(products);
// //   } catch (error) {
// //     console.error("Error getting products:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // //added by me
// // app.get("/categories", async (_req, res) => {
// //   try {
// //     const searchResult = await index.search('', { limit: 10000 });

// //     // Use a Set to keep only unique category names
// //     const categorySet = new Set();

// //     searchResult.hits.forEach(hit => {
// //       if (hit.category_name) {
// //         categorySet.add(hit.category_name.trim());
// //       }
// //     });

// //     // Convert Set to sorted array
// //     const categories = Array.from(categorySet).sort((a, b) =>
// //       a.localeCompare(b)
// //     );

// //     res.json(categories);
// //   } catch (error) {
// //     console.error("Error getting global categories:", error);
// //     res.status(500).send("Server error");
// //   }
// // });



// // // Get all products from all vendors (flattened structure)
// // app.get("/products", async (_req, res) => {
// //   try {
// //     const searchResult = await index.search('', {
// //       limit: 10000
// //     });
    
// //     const products = searchResult.hits.map(hit => ({
// //       id: hit.productId,
// //       productId: hit.productId,
// //       product_name: hit.product_name,
// //       price: hit.price,
// //       description: hit.description,
// //       discount: hit.discount,
// //       details: hit.details,
// //       tier_pricing: hit.tier_pricing,
// //       //product_images: hit.product_images,
// //       product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
// //       //product_images: ["https://i.ibb.co/cm382jK/images-2.jpg"],
// //       //product_video_url: hit.product_video_url,
// //       mobile_number: hit.mobile_number,
// //       isAvailable: hit.isAvailable,
// //       moq: hit.moq,
// //       added_at: hit.added_at,
// //       vendorId: hit.vendorId,
// //       vendorName: hit.vendor_name,
// //       categoryId: hit.categoryId,
// //       categoryName: hit.category_name,
// //       //store_logo: hit.store_logo
// //     }));
    
// //     res.json(products);
// //   } catch (error) {
// //     console.error("Error getting all products:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Get products from a specific vendor (all categories)
// // app.get("/vendors/:vendorId/products", async (req, res) => {
// //   try {
// //     const { vendorId } = req.params;
    
// //     const searchResult = await index.search('', {
// //       limit: 10000
// //     });
    
// //     // Filter products by vendorId
// //     const products = searchResult.hits
// //       .filter(hit => hit.vendorId === vendorId)
// //       .map(hit => ({
// //         id: hit.productId,
// //         productId: hit.productId,
// //         product_name: hit.product_name,
// //         price: hit.price,
// //         description: hit.description,
// //         discount: hit.discount,
// //         details: hit.details,
// //         tier_pricing: hit.tier_pricing,
// //        // product_images: hit.product_images,
// //        product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
// //       //product_images: ["https://i.ibb.co/cm382jK/images-2.jpg"],
// //         //product_video_url: hit.product_video_url,
// //         mobile_number: hit.mobile_number,
// //         isAvailable: hit.isAvailable,
// //         moq: hit.moq,
// //         added_at: hit.added_at,
// //         categoryId: hit.categoryId,
// //         categoryName: hit.category_name,
// //         vendorName: hit.vendor_name,
// //         //store_logo: hit.store_logo
// //       }));
    
// //     if (products.length === 0) {
// //       return res.status(404).json({ error: "Vendor not found" });
// //     }
    
// //     res.json(products);
// //   } catch (error) {
// //     console.error("Error getting vendor products:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Get vendor subscriptions (this endpoint might not be applicable for MeiliSearch data)
// // app.get("/vendors/:vendorId/subscriptions", async (_req, res) => {
// //   try {
// //     // Since subscriptions are not part of the product data structure,
// //     // this endpoint returns empty array or you can modify based on your needs
// //     res.json([]);
// //   } catch (error) {
// //     console.error("Error getting subscriptions:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Add a new product to MeiliSearch
// // app.post("/vendors/:vendorId/categories/:categoryId/products", async (req, res) => {
// //   try {
// //     const { vendorId, categoryId } = req.params;
// //     const productId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
// //     const productData = {
// //       productId: productId,
// //       vendorId: vendorId,
// //       categoryId: categoryId,
// //       ...req.body,
// //       added_at: new Date().toISOString(),
// //       isAvailable: true,
// //     };
    
// //     await index.addDocuments([productData]);
    
// //     res.status(201).json({
// //       id: productId,
// //       productId: productId,
// //       message: "Product added successfully",
// //     });
// //   } catch (error) {
// //     console.error("Error adding product:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Update a product
// // app.put("/vendors/:vendorId/categories/:categoryId/products/:productId", async (req, res) => {
// //   try {
// //     const { productId } = req.params;
    
// //     // Get all documents and find the one to update
// //     const searchResult = await index.search('', {
// //       limit: 10000
// //     });
    
// //     const existingProduct = searchResult.hits.find(hit => hit.productId === productId);
    
// //     if (!existingProduct) {
// //       return res.status(404).json({ error: "Product not found" });
// //     }
    
// //     const updatedProduct = {
// //       ...existingProduct,
// //       ...req.body,
// //       productId: productId // Ensure productId stays the same
// //     };
    
// //     await index.addDocuments([updatedProduct]);
    
// //     res.json({ message: "Product updated successfully" });
// //   } catch (error) {
// //     console.error("Error updating product:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Delete a product
// // app.delete("/vendors/:vendorId/categories/:categoryId/products/:productId", async (req, res) => {
// //   try {
// //     const { productId } = req.params;
    
// //     await index.deleteDocument(productId);
    
// //     res.json({ message: "Product deleted successfully" });
// //   } catch (error) {
// //     console.error("Error deleting product:", error);
// //     res.status(500).send("Server error");
// //   }
// // });

// // // Search products with advanced query
// // app.get("/search", async (req, res) => {
// //   try {
// //     const { q, limit = 10000, offset = 0, category, vendor, minPrice, maxPrice, inStock, sortBy } = req.query;
    
// //     const searchOptions = {
// //       limit: parseInt(limit),
// //       offset: parseInt(offset)
// //     };

// //     // Build filter array
// //     const filters = [];
    
// //     if (category) {
// //       filters.push(`category_name = "${category}"`);
// //     }
    
// //     if (vendor) {
// //       filters.push(`vendorId = "${vendor}"`);
// //     }
    
// //     if (minPrice || maxPrice) {
// //       const priceFilter = [];
// //       if (minPrice) priceFilter.push(`price >= ${minPrice}`);
// //       if (maxPrice) priceFilter.push(`price <= ${maxPrice}`);
// //       filters.push(priceFilter.join(' AND '));
// //     }
    
// //     if (inStock === 'true') {
// //       filters.push(`isAvailable = true`);
// //     }
    
// //     if (filters.length > 0) {
// //       searchOptions.filter = filters;
// //     }

// //     // Sorting options
// //     if (sortBy) {
// //       switch(sortBy) {
// //         case 'price-asc':
// //           searchOptions.sort = ['price:asc'];
// //           break;
// //         case 'price-desc':
// //           searchOptions.sort = ['price:desc'];
// //           break;
// //         case 'newest':
// //           searchOptions.sort = ['added_at:desc'];
// //           break;
// //         case 'discount':
// //           searchOptions.sort = ['discount:desc'];
// //           break;
// //       }
// //     }

// //     const searchResult = await index.search(q || '', searchOptions);
    
// //     const products = searchResult.hits.map(hit => ({
// //       id: hit.productId,
// //       productId: hit.productId,
// //       product_name: hit.product_name,
// //       price: hit.price,
// //       description: hit.description,
// //       discount: hit.discount,
// //       details: hit.details,
// //       tier_pricing: hit.tier_pricing,
// //       product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
// //       mobile_number: hit.mobile_number,
// //       isAvailable: hit.isAvailable,
// //       moq: hit.moq,
// //       added_at: hit.added_at,
// //       vendorId: hit.vendorId,
// //       vendorName: hit.vendor_name,
// //       categoryId: hit.categoryId,
// //       categoryName: hit.category_name,
// //     }));
    
// //     res.json({
// //       hits: products,
// //       totalHits: searchResult.totalHits,
// //       totalPages: Math.ceil(searchResult.totalHits / parseInt(limit)),
// //       currentPage: Math.floor(parseInt(offset) / parseInt(limit)) + 1
// //     });
// //   } catch (error) {
// //     console.error("Error searching products:", error);
// //     res.status(500).send("Server error");
// //   }
// // });


// // // Add this new endpoint to your backend
// // app.get("/products/category/:categoryName", async (req, res) => {
// //   try {
// //     const { categoryName } = req.params;
    
// //     const searchResult = await index.search('', {
// //       filter: [`categoryName = "${categoryName}"`],
// //       limit: 10000
// //     });

// //     const products = searchResult.hits.map(hit => ({
// //       id: hit.productId,
// //       productId: hit.productId,
// //       product_name: hit.product_name,
// //       price: hit.price,
// //       description: hit.description,
// //       discount: hit.discount,
// //       details: hit.details,
// //       tier_pricing: hit.tier_pricing,
// //       product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
// //       mobile_number: hit.mobile_number,
// //       isAvailable: hit.isAvailable,
// //       moq: hit.moq,
// //       added_at: hit.added_at,
// //       vendorId: hit.vendorId,
// //       vendorName: hit.vendor_name,
// //       categoryId: hit.categoryId,
// //       categoryName: hit.category_name
// //     }));
    
// //     res.json(products);
// //   } catch (error) {
// //     console.error("Error getting category products:", error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });


// // // Add this to your backend routes
// // app.get('/products/:id', async (req, res) => {
// //   try {
// //     const searchResult = await index.search('', {
// //       filter: `productId = "${req.params.id}"`,
// //       limit: 10000
// //     });
    
// //     if (searchResult.hits.length === 0) {
// //       return res.status(404).json({ error: 'Product not found' });
// //     }
    
// //     const product = searchResult.hits[0];
// //     res.json({
// //       id: product.productId,
// //       productId: product.productId,
// //       product_name: product.product_name,
// //       price: product.price,
// //       description: product.description,
// //       discount: product.discount,
// //       details: product.details,
// //       tier_pricing: product.tier_pricing,
// //       product_images: (product.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
// //       mobile_number: product.mobile_number,
// //       isAvailable: product.isAvailable,
// //       moq: product.moq,
// //       added_at: product.added_at,
// //       vendorId: product.vendorId,
// //       vendorName: product.vendor_name,
// //       categoryId: product.categoryId,
// //       categoryName: product.category_name
// //     });
// //   } catch (error) {
// //     console.error("Error getting product:", error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // // Add pagination to products endpoint
// // app.get('/products', async (_req, res) => {
// //   try {
    
// //      const searchResult = await index.search('', {
// //       limit: 10000 // Increased from 1000 to 10000
// //     });

// //     const products = searchResult.hits.map(hit => ({
// //       id: hit.productId,
// //       productId: hit.productId,
// //       product_name: hit.product_name,
// //       price: hit.price,
// //       description: hit.description,
// //       discount: hit.discount,
// //       details: hit.details,
// //       tier_pricing: hit.tier_pricing,
// //       product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
// //       mobile_number: hit.mobile_number,
// //       isAvailable: hit.isAvailable,
// //       moq: hit.moq,
// //       added_at: hit.added_at,
// //       vendorId: hit.vendorId,
// //       vendorName: hit.vendor_name,
// //       categoryId: hit.categoryId,
// //       categoryName: hit.category_name
// //     }));
    
// //     res.json({
// //       products,
// //       total: searchResult.totalHits
// //     });
// //   } catch (error) {
// //     console.error("Error getting products:", error);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });



// // // Start server
// // app.listen(PORT, '0.0.0.0', () => {
// //   console.log(`🚀 Server running at http://localhost:${PORT}`);
// //   console.log('\n📋 Available endpoints:');
// //   console.log('   GET  /health - Server health check');
// //   console.log('   GET  /vendors - Get all vendor stores');
// //   console.log('   GET  /vendors/:vendorId - Get specific vendor');
// //   console.log('   GET  /vendors/:vendorId/categories - Get vendor categories');
// //   console.log('   GET  /vendors/:vendorId/categories/:categoryId/products - Get category products');
// //   console.log('   GET  /products - Get all products from all vendors');
// //   console.log('   GET  /search - Search products with filters');
// //   console.log('   POST /vendors/:vendorId/categories/:categoryId/products - Add new product');
// //   console.log('   PUT  /vendors/:vendorId/categories/:categoryId/products/:productId - Update product');
// //   console.log('   DELETE /vendors/:vendorId/categories/:categoryId/products/:productId - Delete product');
// // });


// import dotenv from 'dotenv';
// import express from 'express';
// import cors from 'cors';
// import { MeiliSearch } from 'meilisearch';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Load environment variables from .env.local
// dotenv.config({ path: '.env.local' });

// // Debug: Log loaded environment variables
// console.log('Environment Configuration:');
// console.log('MEILI_HOST:', process.env.MEILI_HOST ? '***' : 'NOT FOUND');
// console.log('MEILI_API_KEY:', process.env.MEILI_API_KEY ? '***' : 'NOT FOUND');
// console.log('PORT:', process.env.PORT || '5000 (default)');

// // Verify required environment variables
// if (!process.env.MEILI_HOST) {
//   console.error('FATAL ERROR: MEILI_HOST is not defined in .env.local');
//   process.exit(1);
// }

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Initialize MeiliSearch client with error handling
// let client;
// let index;
// try {
//   client = new MeiliSearch({
//     host: process.env.MEILI_HOST,
//     apiKey: process.env.MEILI_API_KEY || '',
//     requestConfig: {
//       maxTotalHits: 10000 // Adjust as needed
//     }
//   });
  
//   index = client.index('vendor_store_data');
//   console.log('MeiliSearch client initialized successfully');
// } catch (error) {
//   console.error('Failed to initialize MeiliSearch client:', error);
//   process.exit(1);
// }

// // Cache for frequently accessed data
// const cache = new Map();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// // Utility function to shuffle array using Fisher-Yates algorithm
// function shuffleArray(array) {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// }

// // Cache helper functions
// function getCacheKey(prefix, params = {}) {
//   return `${prefix}_${JSON.stringify(params)}`;
// }

// function setCache(key, data) {
//   cache.set(key, {
//     data,
//     timestamp: Date.now()
//   });
// }

// function getCache(key) {
//   const cached = cache.get(key);
//   if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
//     return cached.data;
//   }
//   cache.delete(key);
//   return null;
// }

// function transformFirebaseUrlToImageKit(firebaseUrl) {
//   if (!firebaseUrl) return '';
  
//   try {
//     const urlObj = new URL(firebaseUrl);
//     const encodedPath = urlObj.pathname.split('/o/')[1];
//     if (!encodedPath) return firebaseUrl;

//     const decodedPath = decodeURIComponent(encodedPath);
//     return `https://ik.imagekit.io/3n0rrhtkz/firebase_files/${decodedPath}`;
//   } catch (error) {
//     console.error('Error transforming Firebase URL:', error);
//     return firebaseUrl;
//   }
// }

// // Transform hit to product object
// function transformHitToProduct(hit) {
//   return {
//     id: hit.productId,
//     productId: hit.productId,
//     product_name: hit.product_name,
//     price: hit.price,
//     description: hit.description,
//     discount: hit.discount,
//     details: hit.details,
//     tier_pricing: hit.tier_pricing,
//     product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
//     mobile_number: hit.mobile_number,
//     isAvailable: hit.isAvailable,
//     moq: hit.moq,
//     added_at: hit.added_at,
//     vendorId: hit.vendorId,
//     vendorName: hit.vendor_name,
//     categoryId: hit.categoryId,
//     categoryName: hit.category_name,
//   };
// }

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Health check endpoint
// app.get('/health', (_req, res) => {
//   res.status(200).json({ status: 'healthy' });
// });

// // Get all vendor stores - OPTIMIZED with caching
// app.get("/vendors", async (_req, res) => {
//   try {
//     const cacheKey = getCacheKey('vendors');
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(shuffleArray(cached));
//     }

//     // Use facets to get unique vendors more efficiently
//     const searchResult = await index.search('', { 
//       facets: ['vendorId'],
//       limit: 1,
//       attributesToRetrieve: []
//     });

//     // Get unique vendor data with a more targeted search
//     const vendorsMap = new Map();
    
//     // Get vendor details with reduced data fetch
//     const detailSearch = await index.search('', { 
//       limit: 1000, // Reasonable limit instead of 10000
//       attributesToRetrieve: ['vendorId', 'vendor_name', 'store_logo']
//     });
    
//     detailSearch.hits.forEach(hit => {
//       if (!vendorsMap.has(hit.vendorId)) {
//         vendorsMap.set(hit.vendorId, {
//           id: hit.vendorId,
//           store_name: hit.vendor_name,
//           store_logo: hit.store_logo
//         });
//       }
//     });

//     const vendors = Array.from(vendorsMap.values());
//     setCache(cacheKey, vendors);
    
//     res.json(shuffleArray(vendors));
//   } catch (error) {
//     console.error("Error getting vendors:", error);
//     res.status(500).json({ error: "Failed to fetch vendors" });
//   }
// });

// // Ensure all responses are JSON
// app.use((_req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   next();
// });

// // Error handling middleware
// app.use((err, _req, res, _next) => {
//   console.error('Error:', err);
//   res.status(500).json({ 
//     error: 'Internal Server Error',
//     message: err.message 
//   });
// });

// // Get specific vendor store by ID - OPTIMIZED
// app.get("/vendors/:vendorId", async (req, res) => {
//   try {
//     const { vendorId } = req.params;
//     const cacheKey = getCacheKey('vendor', { vendorId });
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(cached);
//     }

//     // Use filter for more efficient search
//     const searchResult = await index.search('', {
//       filter: [`vendorId = "${vendorId}"`],
//       limit: 1,
//       attributesToRetrieve: ['vendorId', 'vendor_name', 'store_logo']
//     });
    
//     if (searchResult.hits.length === 0) {
//       return res.status(404).json({ error: "Vendor not found" });
//     }
    
//     const vendor = searchResult.hits[0];
//     const vendorData = {
//       id: vendor.vendorId,
//       store_name: vendor.vendor_name,
//       store_logo: vendor.store_logo
//     };
    
//     setCache(cacheKey, vendorData);
//     res.json(vendorData);
//   } catch (error) {
//     console.error("Error getting vendor:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Get categories for a specific vendor - OPTIMIZED
// app.get("/vendors/:vendorId/categories", async (req, res) => {
//   try {
//     const { vendorId } = req.params;
//     const cacheKey = getCacheKey('vendor_categories', { vendorId });
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(shuffleArray(cached));
//     }

//     const searchResult = await index.search('', {
//       filter: [`vendorId = "${vendorId}"`],
//       limit: 1000,
//       attributesToRetrieve: ['categoryId', 'category_name']
//     });
    
//     // Extract unique categories
//     const categoriesMap = new Map();
//     searchResult.hits.forEach(hit => {
//       if (!categoriesMap.has(hit.categoryId)) {
//         categoriesMap.set(hit.categoryId, {
//           id: hit.categoryId,
//           category_name: hit.category_name
//         });
//       }
//     });

//     const categories = Array.from(categoriesMap.values());
//     setCache(cacheKey, categories);
    
//     res.json(shuffleArray(categories));
//   } catch (error) {
//     console.error("Error getting categories:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Get products for a specific vendor and category - OPTIMIZED
// app.get("/vendors/:vendorId/categories/:categoryId/products", async (req, res) => {
//   try {
//     const { vendorId, categoryId } = req.params;
//     const cacheKey = getCacheKey('vendor_category_products', { vendorId, categoryId });
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(shuffleArray(cached));
//     }

//     // Use filter for efficient search
//     const searchResult = await index.search('', {
//       filter: [`vendorId = "${vendorId}"`, `categoryId = "${categoryId}"`],
//       limit: 1000
//     });
    
//     const products = searchResult.hits.map(transformHitToProduct);
//     setCache(cacheKey, products);
    
//     res.json(shuffleArray(products));
//   } catch (error) {
//     console.error("Error getting products:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Get global categories - OPTIMIZED with caching
// app.get("/categories", async (_req, res) => {
//   try {
//     const cacheKey = getCacheKey('global_categories');
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(shuffleArray(cached));
//     }

//     // Use facets for more efficient category retrieval
//     const searchResult = await index.search('', { 
//       facets: ['category_name'],
//       limit: 1,
//       attributesToRetrieve: []
//     });

//     const categories = Object.keys(searchResult.facetDistribution?.category_name || {})
//       .filter(cat => cat && cat.trim())
//       .sort((a, b) => a.localeCompare(b));
    
//     setCache(cacheKey, categories);
//     res.json(shuffleArray(categories));
//   } catch (error) {
//     console.error("Error getting global categories:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Get all products from all vendors - OPTIMIZED with pagination
// app.get("/products", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 1000;
//     const offset = (page - 1) * limit;
    
//     const cacheKey = getCacheKey('all_products', { page, limit });
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json({
//         products: shuffleArray(cached.products),
//         total: cached.total,
//         page,
//         totalPages: Math.ceil(cached.total / limit)
//       });
//     }

//     const searchResult = await index.search('', {
//       limit,
//       offset
//     });
    
//     const products = searchResult.hits.map(transformHitToProduct);
//     const responseData = {
//       products,
//       total: searchResult.totalHits
//     };
    
//     setCache(cacheKey, responseData);
    
//     res.json({
//       products: shuffleArray(products),
//       total: searchResult.totalHits,
//       page,
//       totalPages: Math.ceil(searchResult.totalHits / limit)
//     });
//   } catch (error) {
//     console.error("Error getting all products:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Get products from a specific vendor - OPTIMIZED
// app.get("/vendors/:vendorId/products", async (req, res) => {
//   try {
//     const { vendorId } = req.params;
//     const cacheKey = getCacheKey('vendor_products', { vendorId });
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(shuffleArray(cached));
//     }

//     const searchResult = await index.search('', {
//       filter: [`vendorId = "${vendorId}"`],
//       limit: 1000
//     });
    
//     if (searchResult.hits.length === 0) {
//       return res.status(404).json({ error: "Vendor not found" });
//     }
    
//     const products = searchResult.hits.map(transformHitToProduct);
//     setCache(cacheKey, products);
    
//     res.json(shuffleArray(products));
//   } catch (error) {
//     console.error("Error getting vendor products:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Get vendor subscriptions (this endpoint might not be applicable for MeiliSearch data)
// app.get("/vendors/:vendorId/subscriptions", async (_req, res) => {
//   try {
//     // Since subscriptions are not part of the product data structure,
//     // this endpoint returns empty array or you can modify based on your needs
//     res.json([]);
//   } catch (error) {
//     console.error("Error getting subscriptions:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Add a new product to MeiliSearch
// app.post("/vendors/:vendorId/categories/:categoryId/products", async (req, res) => {
//   try {
//     const { vendorId, categoryId } = req.params;
//     const productId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
//     const productData = {
//       productId: productId,
//       vendorId: vendorId,
//       categoryId: categoryId,
//       ...req.body,
//       added_at: new Date().toISOString(),
//       isAvailable: true,
//     };
    
//     await index.addDocuments([productData]);
    
//     // Clear relevant caches
//     const cacheKeys = [
//       getCacheKey('all_products'),
//       getCacheKey('vendor_products', { vendorId }),
//       getCacheKey('vendor_category_products', { vendorId, categoryId })
//     ];
//     cacheKeys.forEach(key => cache.delete(key));
    
//     res.status(201).json({
//       id: productId,
//       productId: productId,
//       message: "Product added successfully",
//     });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Update a product - OPTIMIZED
// app.put("/vendors/:vendorId/categories/:categoryId/products/:productId", async (req, res) => {
//   try {
//     const { productId, vendorId, categoryId } = req.params;
    
//     // Get existing product using filter
//     const searchResult = await index.search('', {
//       filter: [`productId = "${productId}"`],
//       limit: 1
//     });
    
//     if (searchResult.hits.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
    
//     const existingProduct = searchResult.hits[0];
//     const updatedProduct = {
//       ...existingProduct,
//       ...req.body,
//       productId: productId // Ensure productId stays the same
//     };
    
//     await index.addDocuments([updatedProduct]);
    
//     // Clear relevant caches
//     const cacheKeys = [
//       getCacheKey('all_products'),
//       getCacheKey('vendor_products', { vendorId }),
//       getCacheKey('vendor_category_products', { vendorId, categoryId })
//     ];
//     cacheKeys.forEach(key => cache.delete(key));
    
//     res.json({ message: "Product updated successfully" });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Delete a product
// app.delete("/vendors/:vendorId/categories/:categoryId/products/:productId", async (req, res) => {
//   try {
//     const { productId, vendorId, categoryId } = req.params;
    
//     await index.deleteDocument(productId);
    
//     // Clear relevant caches
//     const cacheKeys = [
//       getCacheKey('all_products'),
//       getCacheKey('vendor_products', { vendorId }),
//       getCacheKey('vendor_category_products', { vendorId, categoryId })
//     ];
//     cacheKeys.forEach(key => cache.delete(key));
    
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Search products with advanced query - OPTIMIZED
// app.get("/search", async (req, res) => {
//   try {
//     const { q, limit = 100, offset = 0, category, vendor, minPrice, maxPrice, inStock, sortBy, shuffle = 'true' } = req.query;
    
//     const searchOptions = {
//       limit: parseInt(limit),
//       offset: parseInt(offset)
//     };

//     // Build filter array
//     const filters = [];
    
//     if (category) {
//       filters.push(`category_name = "${category}"`);
//     }
    
//     if (vendor) {
//       filters.push(`vendorId = "${vendor}"`);
//     }
    
//     if (minPrice || maxPrice) {
//       const priceFilter = [];
//       if (minPrice) priceFilter.push(`price >= ${minPrice}`);
//       if (maxPrice) priceFilter.push(`price <= ${maxPrice}`);
//       filters.push(priceFilter.join(' AND '));
//     }
    
//     if (inStock === 'true') {
//       filters.push(`isAvailable = true`);
//     }
    
//     if (filters.length > 0) {
//       searchOptions.filter = filters;
//     }

//     // Sorting options
//     if (sortBy) {
//       switch(sortBy) {
//         case 'price-asc':
//           searchOptions.sort = ['price:asc'];
//           break;
//         case 'price-desc':
//           searchOptions.sort = ['price:desc'];
//           break;
//         case 'newest':
//           searchOptions.sort = ['added_at:desc'];
//           break;
//         case 'discount':
//           searchOptions.sort = ['discount:desc'];
//           break;
//       }
//     }

//     const searchResult = await index.search(q || '', searchOptions);
    
//     let products = searchResult.hits.map(transformHitToProduct);
    
//     // Apply shuffling if requested (default is true)
//     if (shuffle === 'true') {
//       products = shuffleArray(products);
//     }
    
//     res.json({
//       hits: products,
//       totalHits: searchResult.totalHits,
//       totalPages: Math.ceil(searchResult.totalHits / parseInt(limit)),
//       currentPage: Math.floor(parseInt(offset) / parseInt(limit)) + 1
//     });
//   } catch (error) {
//     console.error("Error searching products:", error);
//     res.status(500).send("Server error");
//   }
// });

// // Get products by category name - OPTIMIZED
// app.get("/products/category/:categoryName", async (req, res) => {
//   try {
//     const { categoryName } = req.params;
//     const cacheKey = getCacheKey('category_products', { categoryName });
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(shuffleArray(cached));
//     }
    
//     const searchResult = await index.search('', {
//       filter: [`category_name = "${categoryName}"`],
//       limit: 1000
//     });

//     const products = searchResult.hits.map(transformHitToProduct);
//     setCache(cacheKey, products);
    
//     res.json(shuffleArray(products));
//   } catch (error) {
//     console.error("Error getting category products:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get single product by ID - OPTIMIZED
// app.get('/products/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const cacheKey = getCacheKey('single_product', { productId });
//     const cached = getCache(cacheKey);
    
//     if (cached) {
//       return res.json(cached);
//     }

//     const searchResult = await index.search('', {
//       filter: [`productId = "${productId}"`],
//       limit: 1
//     });
    
//     if (searchResult.hits.length === 0) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
    
//     const product = transformHitToProduct(searchResult.hits[0]);
//     setCache(cacheKey, product);
    
//     res.json(product);
//   } catch (error) {
//     console.error("Error getting product:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Clear cache endpoint for admin purposes
// app.post('/admin/clear-cache', (req, res) => {
//   cache.clear();
//   res.json({ message: 'Cache cleared successfully' });
// });

// // Cache stats endpoint for monitoring
// app.get('/admin/cache-stats', (req, res) => {
//   res.json({
//     size: cache.size,
//     keys: Array.from(cache.keys())
//   });
// });

// // Start server
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
//   console.log('\n📋 Available endpoints:');
//   console.log('   GET  /health - Server health check');
//   console.log('   GET  /vendors - Get all vendor stores (shuffled)');
//   console.log('   GET  /vendors/:vendorId - Get specific vendor');
//   console.log('   GET  /vendors/:vendorId/categories - Get vendor categories (shuffled)');
//   console.log('   GET  /vendors/:vendorId/categories/:categoryId/products - Get category products (shuffled)');
//   console.log('   GET  /products - Get all products from all vendors (shuffled, paginated)');
//   console.log('   GET  /search - Search products with filters (shuffled by default)');
//   console.log('   POST /vendors/:vendorId/categories/:categoryId/products - Add new product');
//   console.log('   PUT  /vendors/:vendorId/categories/:categoryId/products/:productId - Update product');
//   console.log('   DELETE /vendors/:vendorId/categories/:categoryId/products/:productId - Delete product');
//   console.log('   POST /admin/clear-cache - Clear application cache');
//   console.log('   GET  /admin/cache-stats - View cache statistics');
// });


import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { MeiliSearch } from 'meilisearch';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Debug: Log loaded environment variables
console.log('Environment Configuration:');
console.log('MEILI_HOST:', process.env.MEILI_HOST ? '***' : 'NOT FOUND');
console.log('MEILI_API_KEY:', process.env.MEILI_API_KEY ? '***' : 'NOT FOUND');
console.log('PORT:', process.env.PORT || '5000 (default)');

// Verify required environment variables
if (!process.env.MEILI_HOST) {
  console.error('FATAL ERROR: MEILI_HOST is not defined in .env.local');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize MeiliSearch client with error handling
let client;
let index;
try {
  client = new MeiliSearch({
    host: process.env.MEILI_HOST,
    apiKey: process.env.MEILI_API_KEY || '',
    requestConfig: {
      maxTotalHits: 10000 // Adjust as needed
    }
  });
  
  index = client.index('vendor_store_data');
  console.log('MeiliSearch client initialized successfully');
} catch (error) {
  console.error('Failed to initialize MeiliSearch client:', error);
  process.exit(1);
}

// Cache for frequently accessed data
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Utility function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Smart shuffle that ensures product diversity by spreading similar items
function smartShuffle(products, diversityKey = 'categoryName') {
  if (!products || products.length <= 1) return products;

  // Group products by diversity key (category, vendor, etc.)
  const groups = new Map();
  products.forEach(product => {
    const key = product[diversityKey] || 'unknown';
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(product);
  });

  // Shuffle each group internally
  groups.forEach((group, key) => {
    groups.set(key, shuffleArray(group));
  });

  // Distribute products evenly to avoid clustering
  const result = [];
  const groupArrays = Array.from(groups.values());
  const maxLength = Math.max(...groupArrays.map(arr => arr.length));

  // Round-robin distribution to spread categories evenly
  for (let i = 0; i < maxLength; i++) {
    groupArrays.forEach(group => {
      if (group[i]) {
        result.push(group[i]);
      }
    });
  }

  // Final light shuffle to add some randomness while maintaining diversity
  return lightShuffle(result);
}

// Light shuffle - only swap items that are far apart to maintain diversity
function lightShuffle(array, swapDistance = 5) {
  const result = [...array];
  const swaps = Math.floor(array.length / 10); // 10% of items get swapped
  
  for (let i = 0; i < swaps; i++) {
    const index1 = Math.floor(Math.random() * result.length);
    const minDistance = Math.min(swapDistance, Math.floor(result.length / 4));
    const index2 = (index1 + minDistance + Math.floor(Math.random() * minDistance)) % result.length;
    
    [result[index1], result[index2]] = [result[index2], result[index1]];
  }
  
  return result;
}

// Weighted shuffle based on multiple factors
function weightedShuffle(products) {
  if (!products || products.length <= 1) return products;

  // First apply smart shuffle for diversity
  let diverseProducts = smartShuffle(products, 'categoryName');
  
  // Then apply vendor diversity if we have too many products from same vendor consecutively
  if (diverseProducts.length > 10) {
    diverseProducts = redistributeByVendor(diverseProducts);
  }

  return diverseProducts;
}

// Redistribute to avoid too many products from same vendor in a row
function redistributeByVendor(products) {
  const result = [];
  const remaining = [...products];
  let lastVendor = null;
  let consecutiveCount = 0;

  while (remaining.length > 0) {
    let nextIndex = 0;
    
    // If we've had too many consecutive items from same vendor, find different vendor
    if (consecutiveCount >= 2 && remaining.length > 1) {
      nextIndex = remaining.findIndex(product => product.vendorId !== lastVendor);
      if (nextIndex === -1) nextIndex = 0; // Fallback if all remaining are same vendor
    }

    const product = remaining.splice(nextIndex, 1)[0];
    result.push(product);

    if (product.vendorId === lastVendor) {
      consecutiveCount++;
    } else {
      consecutiveCount = 1;
      lastVendor = product.vendorId;
    }
  }

  return result;
}

// Cache helper functions
function getCacheKey(prefix, params = {}) {
  return `${prefix}_${JSON.stringify(params)}`;
}

function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

function getCache(key) {
  const cached = cache.get(key);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function transformFirebaseUrlToImageKit(firebaseUrl) {
  if (!firebaseUrl) return '';
  
  try {
    const urlObj = new URL(firebaseUrl);
    const encodedPath = urlObj.pathname.split('/o/')[1];
    if (!encodedPath) return firebaseUrl;

    const decodedPath = decodeURIComponent(encodedPath);
    return `https://ik.imagekit.io/3n0rrhtkz/firebase_files/${decodedPath}`;
  } catch (error) {
    console.error('Error transforming Firebase URL:', error);
    return firebaseUrl;
  }
}

// Transform hit to product object
function transformHitToProduct(hit) {
  return {
    id: hit.productId,
    productId: hit.productId,
    product_name: hit.product_name,
    price: hit.price,
    description: hit.description,
    discount: hit.discount,
    details: hit.details,
    tier_pricing: hit.tier_pricing,
    product_images: (hit.product_images || []).map(imgUrl => transformFirebaseUrlToImageKit(imgUrl)),
    mobile_number: hit.mobile_number,
    isAvailable: hit.isAvailable,
    moq: hit.moq,
    added_at: hit.added_at,
    vendorId: hit.vendorId,
    vendorName: hit.vendor_name,
    categoryId: hit.categoryId,
    categoryName: hit.category_name,
  };
}

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Get all vendor stores - OPTIMIZED with caching
app.get("/vendors", async (_req, res) => {
  try {
    const cacheKey = getCacheKey('vendors');
    const cached = getCache(cacheKey);
    
    if (cached) {
      return res.json(shuffleArray(cached));
    }

    // Use facets to get unique vendors more efficiently
    const searchResult = await index.search('', { 
      facets: ['vendorId'],
      limit: 1,
      attributesToRetrieve: []
    });

    // Get unique vendor data with a more targeted search
    const vendorsMap = new Map();
    
    // Get vendor details with reduced data fetch
    const detailSearch = await index.search('', { 
      limit: 1000, // Reasonable limit instead of 10000
      attributesToRetrieve: ['vendorId', 'vendor_name', 'store_logo']
    });
    
    detailSearch.hits.forEach(hit => {
      if (!vendorsMap.has(hit.vendorId)) {
        vendorsMap.set(hit.vendorId, {
          id: hit.vendorId,
          store_name: hit.vendor_name,
          store_logo: hit.store_logo
        });
      }
    });

    const vendors = Array.from(vendorsMap.values());
    setCache(cacheKey, vendors);
    
    res.json(shuffleArray(vendors));
  } catch (error) {
    console.error("Error getting vendors:", error);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});

// Ensure all responses are JSON
app.use((_req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Get specific vendor store by ID - OPTIMIZED
app.get("/vendors/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const cacheKey = getCacheKey('vendor', { vendorId });
    const cached = getCache(cacheKey);
    
    if (cached) {
      return res.json(cached);
    }

    // Use filter for more efficient search
    const searchResult = await index.search('', {
      filter: [`vendorId = "${vendorId}"`],
      limit: 1,
      attributesToRetrieve: ['vendorId', 'vendor_name', 'store_logo']
    });
    
    if (searchResult.hits.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    
    const vendor = searchResult.hits[0];
    const vendorData = {
      id: vendor.vendorId,
      store_name: vendor.vendor_name,
      store_logo: vendor.store_logo
    };
    
    setCache(cacheKey, vendorData);
    res.json(vendorData);
  } catch (error) {
    console.error("Error getting vendor:", error);
    res.status(500).send("Server error");
  }
});

// Get categories for a specific vendor - OPTIMIZED
app.get("/vendors/:vendorId/categories", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const cacheKey = getCacheKey('vendor_categories', { vendorId });
    const cached = getCache(cacheKey);
    
    if (cached) {
      return res.json(shuffleArray(cached));
    }

    const searchResult = await index.search('', {
      filter: [`vendorId = "${vendorId}"`],
      limit: 1000,
      attributesToRetrieve: ['categoryId', 'category_name']
    });
    
    // Extract unique categories
    const categoriesMap = new Map();
    searchResult.hits.forEach(hit => {
      if (!categoriesMap.has(hit.categoryId)) {
        categoriesMap.set(hit.categoryId, {
          id: hit.categoryId,
          category_name: hit.category_name
        });
      }
    });

    const categories = Array.from(categoriesMap.values());
    setCache(cacheKey, categories);
    
    res.json(shuffleArray(categories));
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).send("Server error");
  }
});

// Get products for a specific vendor and category - OPTIMIZED with smart shuffling
app.get("/vendors/:vendorId/categories/:categoryId/products", async (req, res) => {
  try {
    const { vendorId, categoryId } = req.params;
    const cacheKey = getCacheKey('vendor_category_products', { vendorId, categoryId });
    const cached = getCache(cacheKey);
    
    if (cached) {
      // Use weighted shuffle since these are from same vendor/category
      return res.json(shuffleArray(cached)); // Simple shuffle is fine here as they're same category
    }

    // Use filter for efficient search
    const searchResult = await index.search('', {
      filter: [`vendorId = "${vendorId}"`, `categoryId = "${categoryId}"`],
      limit: 1000
    });
    
    const products = searchResult.hits.map(transformHitToProduct);
    setCache(cacheKey, products);
    
    res.json(shuffleArray(products)); // Simple shuffle is fine for same category products
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).send("Server error");
  }
});

// Get global categories - OPTIMIZED with caching
app.get("/categories", async (_req, res) => {
  try {
    const cacheKey = getCacheKey('global_categories');
    const cached = getCache(cacheKey);
    
    if (cached) {
      return res.json(shuffleArray(cached));
    }

    // Use facets for more efficient category retrieval
    const searchResult = await index.search('', { 
      facets: ['category_name'],
      limit: 1,
      attributesToRetrieve: []
    });

    const categories = Object.keys(searchResult.facetDistribution?.category_name || {})
      .filter(cat => cat && cat.trim())
      .sort((a, b) => a.localeCompare(b));
    
    setCache(cacheKey, categories);
    res.json(shuffleArray(categories));
  } catch (error) {
    console.error("Error getting global categories:", error);
    res.status(500).send("Server error");
  }
});

// Get all products from all vendors - OPTIMIZED with smart shuffling
app.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;
    const offset = (page - 1) * limit;
    const diversityMode = req.query.diversity || 'smart'; // smart, basic, weighted
    
    const cacheKey = getCacheKey('all_products', { page, limit });
    const cached = getCache(cacheKey);
    
    if (cached) {
      let shuffledProducts;
      
      switch(diversityMode) {
        case 'weighted':
          shuffledProducts = weightedShuffle(cached.products);
          break;
        case 'smart':
          shuffledProducts = smartShuffle(cached.products);
          break;
        default:
          shuffledProducts = shuffleArray(cached.products);
      }
      
      return res.json({
        products: shuffledProducts,
        total: cached.total,
        page,
        totalPages: Math.ceil(cached.total / limit)
      });
    }

    const searchResult = await index.search('', {
      limit,
      offset
    });
    
    const products = searchResult.hits.map(transformHitToProduct);
    const responseData = {
      products,
      total: searchResult.totalHits
    };
    
    setCache(cacheKey, responseData);
    
    // Apply smart shuffling for better diversity
    let shuffledProducts;
    switch(diversityMode) {
      case 'weighted':
        shuffledProducts = weightedShuffle(products);
        break;
      case 'smart':
        shuffledProducts = smartShuffle(products);
        break;
      default:
        shuffledProducts = shuffleArray(products);
    }
    
    res.json({
      products: shuffledProducts,
      total: searchResult.totalHits,
      page,
      totalPages: Math.ceil(searchResult.totalHits / limit)
    });
  } catch (error) {
    console.error("Error getting all products:", error);
    res.status(500).send("Server error");
  }
});

// Get products from a specific vendor - OPTIMIZED with smart shuffling
app.get("/vendors/:vendorId/products", async (req, res) => {
  try {
    const { vendorId } = req.params;
    const cacheKey = getCacheKey('vendor_products', { vendorId });
    const cached = getCache(cacheKey);
    
    if (cached) {
      // Use smart shuffle to spread categories from this vendor
      return res.json(smartShuffle(cached, 'categoryName'));
    }

    const searchResult = await index.search('', {
      filter: [`vendorId = "${vendorId}"`],
      limit: 1000
    });
    
    if (searchResult.hits.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    
    const products = searchResult.hits.map(transformHitToProduct);
    setCache(cacheKey, products);
    
    // Smart shuffle to distribute categories evenly
    res.json(smartShuffle(products, 'categoryName'));
  } catch (error) {
    console.error("Error getting vendor products:", error);
    res.status(500).send("Server error");
  }
});

// Get vendor subscriptions (this endpoint might not be applicable for MeiliSearch data)
app.get("/vendors/:vendorId/subscriptions", async (_req, res) => {
  try {
    // Since subscriptions are not part of the product data structure,
    // this endpoint returns empty array or you can modify based on your needs
    res.json([]);
  } catch (error) {
    console.error("Error getting subscriptions:", error);
    res.status(500).send("Server error");
  }
});

// Add a new product to MeiliSearch
app.post("/vendors/:vendorId/categories/:categoryId/products", async (req, res) => {
  try {
    const { vendorId, categoryId } = req.params;
    const productId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const productData = {
      productId: productId,
      vendorId: vendorId,
      categoryId: categoryId,
      ...req.body,
      added_at: new Date().toISOString(),
      isAvailable: true,
    };
    
    await index.addDocuments([productData]);
    
    // Clear relevant caches
    const cacheKeys = [
      getCacheKey('all_products'),
      getCacheKey('vendor_products', { vendorId }),
      getCacheKey('vendor_category_products', { vendorId, categoryId })
    ];
    cacheKeys.forEach(key => cache.delete(key));
    
    res.status(201).json({
      id: productId,
      productId: productId,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Server error");
  }
});

// Update a product - OPTIMIZED
app.put("/vendors/:vendorId/categories/:categoryId/products/:productId", async (req, res) => {
  try {
    const { productId, vendorId, categoryId } = req.params;
    
    // Get existing product using filter
    const searchResult = await index.search('', {
      filter: [`productId = "${productId}"`],
      limit: 1
    });
    
    if (searchResult.hits.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    const existingProduct = searchResult.hits[0];
    const updatedProduct = {
      ...existingProduct,
      ...req.body,
      productId: productId // Ensure productId stays the same
    };
    
    await index.addDocuments([updatedProduct]);
    
    // Clear relevant caches
    const cacheKeys = [
      getCacheKey('all_products'),
      getCacheKey('vendor_products', { vendorId }),
      getCacheKey('vendor_category_products', { vendorId, categoryId })
    ];
    cacheKeys.forEach(key => cache.delete(key));
    
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Server error");
  }
});

// Delete a product
app.delete("/vendors/:vendorId/categories/:categoryId/products/:productId", async (req, res) => {
  try {
    const { productId, vendorId, categoryId } = req.params;
    
    await index.deleteDocument(productId);
    
    // Clear relevant caches
    const cacheKeys = [
      getCacheKey('all_products'),
      getCacheKey('vendor_products', { vendorId }),
      getCacheKey('vendor_category_products', { vendorId, categoryId })
    ];
    cacheKeys.forEach(key => cache.delete(key));
    
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Server error");
  }
});

// Search products with advanced query - OPTIMIZED with smart shuffling
app.get("/search", async (req, res) => {
  try {
    const { q, limit = 100, offset = 0, category, vendor, minPrice, maxPrice, inStock, sortBy, shuffle = 'smart' } = req.query;
    
    const searchOptions = {
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    // Build filter array
    const filters = [];
    
    if (category) {
      filters.push(`category_name = "${category}"`);
    }
    
    if (vendor) {
      filters.push(`vendorId = "${vendor}"`);
    }
    
    if (minPrice || maxPrice) {
      const priceFilter = [];
      if (minPrice) priceFilter.push(`price >= ${minPrice}`);
      if (maxPrice) priceFilter.push(`price <= ${maxPrice}`);
      filters.push(priceFilter.join(' AND '));
    }
    
    if (inStock === 'true') {
      filters.push(`isAvailable = true`);
    }
    
    if (filters.length > 0) {
      searchOptions.filter = filters;
    }

    // Sorting options
    if (sortBy) {
      switch(sortBy) {
        case 'price-asc':
          searchOptions.sort = ['price:asc'];
          break;
        case 'price-desc':
          searchOptions.sort = ['price:desc'];
          break;
        case 'newest':
          searchOptions.sort = ['added_at:desc'];
          break;
        case 'discount':
          searchOptions.sort = ['discount:desc'];
          break;
      }
    }

    const searchResult = await index.search(q || '', searchOptions);
    
    let products = searchResult.hits.map(transformHitToProduct);
    
    // Apply different types of shuffling based on request
    if (shuffle !== 'false') {
      switch(shuffle) {
        case 'weighted':
          products = weightedShuffle(products);
          break;
        case 'smart':
          products = smartShuffle(products);
          break;
        case 'basic':
          products = shuffleArray(products);
          break;
        default:
          products = smartShuffle(products); // default to smart
      }
    }
    
    res.json({
      hits: products,
      totalHits: searchResult.totalHits,
      totalPages: Math.ceil(searchResult.totalHits / parseInt(limit)),
      currentPage: Math.floor(parseInt(offset) / parseInt(limit)) + 1
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).send("Server error");
  }
});

// Get products by category name - OPTIMIZED with vendor diversity
app.get("/products/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const cacheKey = getCacheKey('category_products', { categoryName });
    const cached = getCache(cacheKey);
    
    if (cached) {
      // Use smart shuffle to spread vendors within this category
      return res.json(smartShuffle(cached, 'vendorId'));
    }
    
    const searchResult = await index.search('', {
      filter: [`category_name = "${categoryName}"`],
      limit: 1000
    });

    const products = searchResult.hits.map(transformHitToProduct);
    setCache(cacheKey, products);
    
    // Smart shuffle to distribute different vendors evenly within category
    res.json(smartShuffle(products, 'vendorId'));
  } catch (error) {
    console.error("Error getting category products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single product by ID - OPTIMIZED
app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const cacheKey = getCacheKey('single_product', { productId });
    const cached = getCache(cacheKey);
    
    if (cached) {
      return res.json(cached);
    }

    const searchResult = await index.search('', {
      filter: [`productId = "${productId}"`],
      limit: 1
    });
    
    if (searchResult.hits.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = transformHitToProduct(searchResult.hits[0]);
    setCache(cacheKey, product);
    
    res.json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Clear cache endpoint for admin purposes
app.post('/admin/clear-cache', (req, res) => {
  cache.clear();
  res.json({ message: 'Cache cleared successfully' });
});

// Cache stats endpoint for monitoring
app.get('/admin/cache-stats', (req, res) => {
  res.json({
    size: cache.size,
    keys: Array.from(cache.keys())
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('\n📋 Available endpoints:');
  console.log('   GET  /health - Server health check');
  console.log('   GET  /vendors - Get all vendor stores (shuffled)');
  console.log('   GET  /vendors/:vendorId - Get specific vendor');
  console.log('   GET  /vendors/:vendorId/categories - Get vendor categories (shuffled)');
  console.log('   GET  /vendors/:vendorId/categories/:categoryId/products - Get category products (shuffled)');
  console.log('   GET  /products - Get all products (smart shuffled, paginated)');
  console.log('     └─ ?diversity=smart|weighted|basic - Control shuffling algorithm');
  console.log('   GET  /vendors/:vendorId/products - Get vendor products (category-distributed)');
  console.log('   GET  /products/category/:categoryName - Get category products (vendor-distributed)');
  console.log('   GET  /search - Search products with smart diversity');
  console.log('     └─ ?shuffle=smart|weighted|basic|false - Control shuffling');
  console.log('   POST /vendors/:vendorId/categories/:categoryId/products - Add new product');
  console.log('   PUT  /vendors/:vendorId/categories/:categoryId/products/:productId - Update product');
  console.log('   DELETE /vendors/:vendorId/categories/:categoryId/products/:productId - Delete product');
  console.log('   POST /admin/clear-cache - Clear application cache');
  console.log('   GET  /admin/cache-stats - View cache statistics');
  console.log('\n🎲 Smart Shuffling Features:');
  console.log('   • Smart: Category/vendor diversity (default)');
  console.log('   • Weighted: Multi-factor diversity with redistribution');
  console.log('   • Basic: Pure random shuffle');
  console.log('   • Auto-distributes similar products to avoid clustering');
});