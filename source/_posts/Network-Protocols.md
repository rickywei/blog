---
title: Network Protocols
date: 2020-03-23 19:46:40
update:
tags: [Network]
categories: [Network]
description: 
---

## Introduction

### Layering

OSI 5 layer model

![OSI5](https://s1.ax1x.com/2020/03/24/8bmcvT.png)

OSI 7 layer model

![OSI7](https://s1.ax1x.com/2020/03/24/8bmoP1.png)

Overivew

![Overivew](https://s1.ax1x.com/2020/03/24/8bmvad.png)

## The Internet Address Architecture

### Classful Addressing

Every unicast IP address had a network portion, to identify the network on which the interface using the IP address was to be found, and a host portion, used to identify the particular host on the network given in the network portion. Thus, some number of contiguous bits in the address became known as the net number, and remaining bits were known as the host number

![ip class](https://s1.ax1x.com/2020/03/24/8bGfld.png)

![ip class2](https://s1.ax1x.com/2020/03/24/8bJen1.png)

### Subnet Addressing

The site may further divide the host portion of its base address allocation into a subnetwork (subnet) number and a host number. Essentially, subnet addressing adds one additional field to the IP address structure, but without adding any bits to its length. As a result, a site administrator is able to trade off the number of subnetworks versus the number of hosts expected to be on each subnetwork without having to coordinate with other sites

![subnet](https://s1.ax1x.com/2020/03/24/8bJWNT.png)

### Subnet Masks

The subnet mask is an assignment of bits used by a host or router to determine how the network and subnetwork information is partitioned from the host information in a corresponding IP address-- where the network/subnetwork portion of an IP address ends and the host part begins

![subnet mask](https://s1.ax1x.com/2020/03/24/8bJzgH.png)

### Variable-length subnet masks (VLSM)

It is possible to use a different-length subnet mask applied to the same network number in different portions of the same site. Although doing this complicates address configuration management, it adds flexibility to the subnet structure because different subnetworks may be set up with different numbers of hosts.

![vlsm](https://s1.ax1x.com/2020/03/24/8bNmBn.png)

### Broadcast Addresses

![boradcast](https://s1.ax1x.com/2020/03/24/8bNcDA.png)

### CIDR

Classless Inter-Domain Routing (CIDR) is used to help relieve the pressure on the availability of IPv4 addresses (especially class B addresses). Using CIDR, any address range is not predefined as being part of a class but instead requires a mask similar to a subnet mask, sometimes called a CIDR mask. CIDR masks are not limited to a site but are instead visible to the global routing system. Thus, the core Internet routers must be able to interpret and process masks in addition to network numbers. This combination of numbers, called a network prefix, is used for both IPv4 and IPv6 address management.

### Aggregation

In the Internet context, the hierarchical routing idea can be used in a specific way to reduce the number of Internet routing entries that would be required otherwise. This is accomplished by a procedure known as route aggregation. It works by joining multiple numerically adjacent IP prefixes into a single shorter prefix (called an aggregate or summary) that covers more address space

![aggregate](https://s1.ax1x.com/2020/03/24/8baQlF.png)

### Addressing IPv4/IPv6 Translators

In some networks, it may be attractive to perform translation between IPv4 and IPv6. The scheme makes use of a specialized address format called an IPv4-embedded IPv6 address. This type of address contains an IPv4 address inside an IPv6 address.

![embed ipv4](https://s1.ax1x.com/2020/03/24/8bdk9K.png)

## Link Layer

## APR: Address REsolution Protocol

Address resolution is the process of discovering the mapping from one address to another.

### 
