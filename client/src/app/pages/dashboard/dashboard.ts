import { Component } from '@angular/core';
import { BlogCard } from "../../components/blog-card/blog-card";
import { HeroSection } from "../../components/hero-section/hero-section";

@Component({
  selector: 'app-dashboard',
  imports: [BlogCard, HeroSection],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  blogs = [
    {
      id: 1,
      title: "First Blog Post",
      image: "https://picsum.photos/400/200",
      description: "This is sample blog post preview text. It shows 3 to 4 lines of content."
    },
    {
      id: 2,
      title: "Second Blog Post",
      image: "https://picsum.photos/400/201",
      description: "Another blog preview content for testing blog card layout."
    },
    {
      id: 3,
      title: "Third Blog Post",
      image: "https://picsum.photos/400/202",
      description: "More sample content for blog preview cards."
    }
  ];

}
