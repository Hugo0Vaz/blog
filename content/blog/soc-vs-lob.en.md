---
title: Separation of Concearns versus Locality of Behaviour
cascade:
  type: blog
---

## Introduction

TODO: create introduction.

## What is Separations of Concearns?

Separation of Concerns (SoC) is a fundamental design principle in software engineering and computer science that involves breaking down a software system into distinct sections, each addressing a specific concern or aspect of the system's functionality. A "concern" in this context refers to a particular feature, behavior or piece of functionality that a program must implement.

### Key Aspects of Separation of Concerns:

1. **Modularity**
2. **Encapsulation**
3. **Independence**
4. **Maintainability**
5. **Reusability**
6. **Testability**
7. **Improved Code Organization**
8. **Simplified Debugging and Maintenance**
9. **Enhanced Collaboration**
10. **Scalability**

### Examples of Separation of Concerns:

- **MVC Pattern (Model-View-Controller)**: in web development, the MVC pattern separates concerns by dividing the application into three main components: Model (data and business logic), View (user interface), and Controller (request handling and application flow).

- **Microservices Architecture**: in a microservices architecture, different services are responsible for different business capabilities. Each service handles a specific concern, and services communicate with each other through well-defined APIs.

- **Layered Architecture**: applications are often divided into layers such as presentation, business logic, and data access layers. Each layer addresses a specific concern and interacts with adjacent layers through defined interfaces.


## What is Locality of Bahaviour?

Locality of Behavior is a software design principle that emphasizes keeping related functionality and behaviors close together within the codebase. This principle aims to enhance code readability and maintainability by ensuring that code elements that interact frequently or belong to the same logical operation are grouped together.

### Key Aspects of Locality of Behavior:

1. **Proximity**
2. **Cohesion**
3. **Readability**
4. **Maintainability**
5. **Simplified Debugging**
6. **Enhanced Collaboration**
7. **Reduced Cognitive Load**

### Examples of Locality of Behavior:

- **Class Methods**: in object-oriented programming, methods related to a particular class’s behavior are defined within that class. For instance, all methods manipulating an object’s state are found within that object's class.

- **Modules and Packages**: in modular programming, related functions and classes are grouped into modules and packages. This organization ensures that all related code is contained within a single module, making it easier to locate and manage.

- **Functions and Closures**: in functional programming, functions that operate on the same data or achieve the same goal are often defined in close proximity. Closures can be used to keep related data and functions together.

## LoB over SoC: the hot take

### My thoughts on LoB
As a software designer I live by a couple of principles:

1. I'm a [grug brain developer (brain very smol)](https://grugbrain.dev/).
2. "Premature Optimization is the root of all evil" - [*Donald Knuth*](https://en.wikipedia.org/wiki/Donald_Knuth).
3. If it ain't broke, don't fix it.


