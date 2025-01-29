"use client"

import React, { useState, useEffect } from 'react';
import { useWalletContext } from '@/contexts/WalletContext';
import { ImagePlus, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  content: string;
  timestamp: number;
  address: string;
  imageUrl?: string;
}

export const UserPosts = () => {
  const { isConnected, address } = useWalletContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      // Here you would fetch posts from your backend/smart contract
      setPosts([
        {
          id: '1',
          content: 'Exploring new async patterns in Node.js',
          timestamp: Date.now(),
          address: address
        },
        {
          id: '2',
          content: 'Just deployed my first smart contract!',
          timestamp: Date.now() - 86400000,
          address: address
        }
      ]);
    }
  }, [isConnected, address]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!newPost.trim()) return;

    // Here you would implement the actual post creation logic
    const newPostObj = {
      id: Date.now().toString(),
      content: newPost,
      timestamp: Date.now(),
      address: address || '',
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setSelectedImage(null);
    setIsCreating(false);
  };

  if (!isConnected) {
    return (
      <div className="terminal-window p-2 rounded-lg">
        <h2 className="text-sm font-mono mb-2">> Welcome Message</h2>
        <p className="text-[var(--matrix-green)] opacity-80 text-xs">
          Welcome! Connect your wallet to view your latest posts and participate in the community.
        </p>
      </div>
    );
  }

  return (
    <div className="terminal-window p-2 rounded-lg">
      <h2 className="text-sm font-mono mb-2">> Your Latest Posts</h2>
      
      {isCreating ? (
        <div className="border-l-2 border-[var(--matrix-green)] pl-3 mb-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent border border-[var(--matrix-green)] rounded p-2 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-[var(--matrix-green)]"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <ImagePlus className="h-4 w-4 hover:text-[var(--matrix-green)]" />
              </label>
              {selectedImage && (
                <span className="text-xs flex items-center gap-1">
                  {selectedImage.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-[var(--matrix-green)]"
                    onClick={() => setSelectedImage(null)}
                  />
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsCreating(false)}
                className="text-xs py-1 px-2 h-auto bg-transparent border border-[var(--matrix-green)] hover:bg-[var(--matrix-dark-green)]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="text-xs py-1 px-2 h-auto bg-[var(--matrix-green)] text-black hover:bg-[var(--matrix-dark-green)] hover:text-[var(--matrix-green)]"
              >
                Post <Send className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsCreating(true)}
          className="text-xs mb-4 py-1 px-2 h-auto bg-transparent border border-[var(--matrix-green)] hover:bg-[var(--matrix-dark-green)]"
        >
          Create Post
        </Button>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="border-l-2 border-[var(--matrix-green)] pl-3">
            <p className="text-xs opacity-80">{post.content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post attachment"
                className="mt-2 max-h-32 rounded"
              />
            )}
            <p className="text-[10px] opacity-60 mt-1">
              {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-[var(--matrix-green)] opacity-80 text-xs">
            No posts yet. Start the conversation!
          </p>
        )}
      </div>
    </div>
  );
};