const experienceSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    seasonal: String,
    tags: [String],
    imageUrl: String,
    location: String,
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Host'
    },
  });
  