import React, { Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { GithubIcon } from "@/components/ui/github";
import { LinkIcon } from "@/components/ui/link";
import { YoutubeIcon } from "@/components/ui/youtube";
import { InstagramIcon } from "@/components/ui/instagram";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { Separator } from "@/components/ui/separator";

interface Project {
  title: string;
  thumbnail: string;
  year: number;
  period: string;
  description: string;
  images: string[];
  link: string;
  video: string;
  repository: string;
  note: string;
  techs?: string[];
  slug: string;
  content: string;
}

interface Profile {
  file: string;
  title: string;
  titleEng: string;
  thumbnail: string;
  period: string;
  description: string;
  images: string[];
  note: string;
  content: string;
}

export default function Home() {
  const projectsDir = path.join(process.cwd(), "public", "projects");
  const projectFiles = fs.readdirSync(projectsDir);

  const projects: Project[] = projectFiles.map((file) => {
    const filePath = path.join(projectsDir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      title: data.title,
      thumbnail: data.thumbnail,
      year: data.year,
      period: data.period,
      description: data.description,
      images: data.images ?? [],
      link: data.link ?? null,
      video: data.video ?? null,
      repository: data.repository ?? null,
      note: data.note ?? null,
      techs: data.techs ?? [],
      slug: data.slug,
      content,
    };
  });

  const projectsByYear = projects.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  const sortedYears = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const profilesDir = path.join(process.cwd(), "public", "profiles");
  const profileFiles = fs.readdirSync(profilesDir);

  const profiles: Profile[] = profileFiles.map((file) => {
    const filename = path.basename(file, ".md");
    const filePath = path.join(profilesDir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      file: filename,
      title: data.title,
      titleEng: data.titleEng,
      thumbnail: data.thumbnail,
      period: data.period,
      description: data.description ?? null,
      images: data.images ?? null,
      note: data.note ?? null,
      content,
    };
  });
  const sortedProfiles = profiles.sort((a, b) => {
    return a.file.localeCompare(b.file);
  });
  console.log(sortedProfiles);

  return (
    <div className="flex flex-col items-center w-screen min-h-screen pt-6 sm:pt-12">
      <div className="w-[300px] sm:w-[650px] flex flex-col items-center space-y-12 py-2 text-start flex-grow">
        {/* Top Page */}
        <section className="space-y-4 w-full flex flex-col items-center">
          <div className="w-full flex flex-col-reverse sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-6">
            <div className="flex flex-col space-y-1 sm:space-y-4">
              <h1 className="w-full text-start">大塚遙 -Yoh Otsuka-</h1>
              <div className="w-full flex justify-start">
                <a href="https://github.com/yoh-siba" target="_blank">
                  <GithubIcon className="w-9 h-9 sm:w-12 sm:h-12" />
                </a>
                {/* <TwitterIcon className="w-9 h-9 sm:w-12 sm:h-12" /> */}
                <a href="https://www.instagram.com/yo_tsuka_o/" target="_blank">
                  <InstagramIcon className="w-9 h-9 sm:w-12 sm:h-12" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yoh-otsuka/"
                  target="_blank"
                >
                  <LinkedinIcon className="w-9 h-9 sm:w-12 sm:h-12" />
                </a>
              </div>

              <p className="text-start">
                関西在住のソフトウェアエンジニア
                {/* 2000年12月20日生まれ。兵庫県神戸育ち。 */}
                <br />
                人々の学びや娯楽を充実させるアプリを作ってます。
                <br />
                休日は謎解きしたり。バレーボールしたり。お絵描きしたり。
                <br />
              </p>
            </div>
            <div className="flex-y-grow">
              <Avatar className="w-36 h-36 sm:w-48 sm:h-48 bg-gray-200">
                <AvatarImage
                  src="/images/profile_image.jpg"
                  alt="profile_image"
                  className="w-full h-full object-cover object-top object-[75%_25%]"
                />
              </Avatar>
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="space-y-4 w-full flex flex-col items-center">
          <h2 className="w-full text-start">Profile</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-[80%]"
          >
            <CarouselContent>
              {sortedProfiles.map((profile, idx) => (
                <Dialog key={idx}>
                  <DialogTrigger asChild>
                    <CarouselItem className="md:basis-1/1 lg:basis-1/2 cursor-pointer">
                      <div className="p-1">
                        <Card className="p-0">
                          <CardContent className="flex flex-col items-center justify-center space-y-2 pt-2 pb-6 px-2">
                            <Image
                              src={
                                "/images/profiles/thumbnails/" +
                                profile.thumbnail
                              }
                              alt={profile.titleEng}
                              width={600}
                              height={600}
                              priority={true}
                              className="w-full object-cover rounded-lg"
                            />
                            <div className="w-full text-start px-2">
                              <h4>{profile.title}</h4>
                              <p className="">{profile.titleEng}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  </DialogTrigger>
                  <DialogContent className="max-w-screen p-4">
                    <DialogHeader>
                      <DialogTitle className="text-start px-12">
                        {profile.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className=" flex flex-col items-center  px-12">
                      <h3>詳細</h3>
                      <div className="w-full text-start">
                        {profile.content && (
                          <p className="text-start">
                            {profile.content.split("\n").map((line, index) => (
                              <span key={line + index}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </p>
                        )}
                        {profile.note && (
                          <p className="text-sm text-muted-foreground">
                            {profile.note}
                          </p>
                        )}
                      </div>
                      {profile.images && (
                        <Carousel className="w-full">
                          <CarouselContent className="">
                            {profile.images.map((image, index) => (
                              <CarouselItem
                                className="flex justify-center"
                                key={index}
                              >
                                <div className="">
                                  <Card className="w-full my-1 border-none">
                                    <CardContent className="flex items-center justify-center">
                                      <Image
                                        src={"/images/profiles/" + image}
                                        alt={image}
                                        width={600}
                                        height={600}
                                        priority={true}
                                        className="w-full object-cover rounded-lg"
                                      />
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {profile.images.length > 1 && (
                            <Fragment>
                              <CarouselPrevious className="absolute bottom-10 left-4 w-8 h-8" />
                              <CarouselNext className="absolute bottom-10 right-4 w-8 h-8" />
                            </Fragment>
                          )}
                        </Carousel>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-16 h-16" />
            <CarouselNext className="w-16 h-16" />
          </Carousel>
        </section>

        {/* Projects */}
        <section className="space-y-4 w-full">
          <h2 className="text-start">Projects</h2>
          {sortedYears.map((year) => (
            <div key={year} className="">
              <h3 className="text-start">{year}</h3>
              <Accordion type="single" collapsible className="w-full">
                {projectsByYear[year].map((project, idx) => (
                  <AccordionItem key={idx} value={`${year}-${idx}`}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-start w-full ">
                        <div className="flex-y-grow">
                          <Avatar className="w-24 h-24 bg-gray-200">
                            <AvatarImage
                              src={
                                "/images/projects/thumbnails/" +
                                project.thumbnail
                              }
                              alt="@shadcn"
                              className="object-contain w-full h-full"
                            />
                          </Avatar>
                        </div>
                        <div className="p-4 space-y-2">
                          <h4>{project.title}</h4>
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col-reverse sm:flex-row items-center justify-start w-full ">
                        {project.images && (
                          <Carousel className="mb-6">
                            <CarouselContent className="w-48 sm:w-36">
                              {project.images.map((image, index) => (
                                <CarouselItem key={index} className="w-full">
                                  <div className="">
                                    <Card className="p-0 my-1 border-none">
                                      <CardContent className="flex items-center justify-center p-0 ">
                                        <Dialog>
                                          <DialogTrigger>
                                            {" "}
                                            <Image
                                              src={
                                                "/images/projects/details/" +
                                                image
                                              }
                                              alt={project.slug}
                                              width={400}
                                              height={400}
                                              priority={true}
                                              className="w-60 object-cover p-0"
                                            />
                                          </DialogTrigger>
                                          <DialogContent className="max-w-screen p-4">
                                            <DialogHeader>
                                              <DialogTitle />
                                              <Image
                                                src={
                                                  "/images/projects/details/" +
                                                  image
                                                }
                                                alt={project.slug}
                                                width={1200}
                                                height={1200}
                                              />
                                            </DialogHeader>
                                          </DialogContent>
                                        </Dialog>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            {project.images.length > 1 && (
                              <Fragment>
                                <CarouselPrevious className="absolute bottom-10 left-0 sm:left-0" />
                                <CarouselNext className="absolute bottom-6 right-0 sm:right-0" />
                              </Fragment>
                            )}
                          </Carousel>
                        )}
                        <div className="flex flex-col items-start p-1 sm:p-4 space-y-2 text-start">
                          <p>開発期間: {project.period}</p>
                          {project.techs && project.techs.length > 0 && (
                            <p className="">
                              使用技術: {project.techs?.join(", ")}
                            </p>
                          )}
                          {project.note && (
                            <p className="text-sm text-muted-foreground">
                              {project.note}
                            </p>
                          )}
                          <div className="flex items-center justify-end">
                            {project.repository && (
                              <a href={project.repository} target="_blank">
                                <GithubIcon className="w-9 h-9 sm:w-12 sm:h-12" />
                              </a>
                            )}
                            {project.link && (
                              <a href={project.link} target="_blank">
                                <LinkIcon className="w-9 h-9 sm:w-12 sm:h-12" />
                              </a>
                            )}
                            {project.video && (
                              <a href={project.video} target="_blank">
                                <YoutubeIcon className="w-9 h-9 sm:w-12 sm:h-12" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>
        <div className="w-full flex flex-col items-center">
          <Separator />
          <p className="my-4">© 2025 Yoh Otsuka</p>
        </div>
      </div>
    </div>
  );
}
