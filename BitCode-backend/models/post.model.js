import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://lh3.googleusercontent.com/drive-viewer/AKGpihYJp8urkokoO2bXvQKOD1jeS2vAtnkUZF3XaH6lqs15a_8NFz6i8vKlnZsuZhEUpOLDb54cDcFBNpYNUB_nA-vmusSgFeVtsQ=s1600-rw-v1',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;