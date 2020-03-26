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

## APR: Address Resolution Protocol

Address resolution is the process of discovering the mapping from one address to another --  from the logical Internet address to its corresponding physical hardware address.

### ARP process

In this section, we enumerate the steps taken in direct delivery,focusing on the operation of ARP. Direct delivery takes place when an IP datagram is sent to an IP address with the same IP prefix as the sender’s.

1. 10.0.0.2 send arp request/query -- who has 10.0.0.1 tell 10.0.0.2
2. brodacast
3. only who has ip 10.0.0.1 reply this query
4. 10.0.0.2 receive reply, send data and cache this arp entry

![arp process](https://s1.ax1x.com/2020/03/25/8XeNhd.png)

### ARP Cache

This cache maintains the recent mappings from network-layer addresses to hardware addresses for each interface that uses address resolution.
A timeout is normally associated with each entry in the ARP cache.Most implementations have a timeout of 20minutes for a completed entry and 3 minutes for an incomplete entry.

### ARP Frame Format

![arp frame format](https://s1.ax1x.com/2020/03/25/8XeR9s.png)

### Proxy ARP

Proxy ARP lets a system (generally a specially configured router)answer ARP requests for a different host. This fools the sender of the ARP request into thinking that the responding system is the destination host, when in fact the destination host may be elsewhere (or may not exist). Proxy ARP is not commonly used and is generally to be avoided if possible.

### Gratuitous ARP and Address Confilict Detection

Another feature of ARP is called gratuitous ARP. It occurs when a host sends an ARP request looking for its own address. This is usually done when the interface is configured “up” at bootstrap time.
Gratuitous ARP achieves two goals:

1. It lets a host determine if another host is already configured with the same IPv4 address. The host sending the gratuitous ARP is not expecting a reply to its request.
2. If the host sending the gratuitous ARP has just changed its hardware address (perhaps the host was shut down, the interface card was replaced, and then the host was rebooted), this frame causes any other host receiving the broadcast that has an entry in its cache for the old hardware address to update its ARP cache entry accordingly

Although gratuitous ARP provides some indication that multiple stations may be attempting to use the same IPv4 address, it really provides no mechanism to react to the situation. Conflict Detection (ACD) is used to deal with this issue.

1. a host sends an ARP probe (An ARP probe is an ARP request packet in which the Sender’s Protocol (IPv4) Address field is set to 0. Probes are used to see if a candidate IPv4 address is being used by any other systems in the broadcast domain) when an interface is brought up or out of sleep, or when a new link is established
2. While sending its probes, a requesting station may receive ARP requests or replies. A reply to its probe indicates that a different station is already using the candidate IP address. A request containing the same candidate IPv4 address in the Target Protocol Address field sent from a different system indicates that the other system is simultaneously attempting to acquire the candidate IPv4 address. In either case, the system should indicate an address conflict message and pursue some alternative address
3. If a requesting host does not discover a conflict according to the procedure just described, it sends two ARP announcements spaced 2s apart to indicate to systems in the broadcast domain the IPv4 address it is now using. In the announcements, both the Sender’s Protocol Address and the Target Protocol Address fields are set to the address being claimed.

## The Internet Protocol (IP)

### IPv4 and IPv6 Headers

The 4 bytes in a 32-bit value are transmitted in the following order: bits 0–7 first, then bits 8–15, then 16–23, and bits 24–31 last. This is called big endian byte ordering, which is the byte ordering required for all binary integers in the TCP/IP headers as they traverse a network. It is also called network byte order. Computer CPUs that store binary integers in other formats, such as the little endian format used by most PCs, must convert the header values into network byte order for transmission and back again for reception

![ipv4 header](https://s1.ax1x.com/2020/03/26/8x09qP.png)

1. Version field:  contains the version number of the IP datagram: 4 for IPv4 and 6 for IPv6
2. Internet Header Length (IHL) field:  the number of 32-bit words in the IPv4 header, including any options.Because this is also a 4-bit field, the IPv4 header is limited to a maximum of fifteen 32-bit words or 60 bytes
3. Differentiated Services Field (DS Field)
4. Explicit Congestion Notification (ECN) field or indicator bits
5. Total Length field: the total length of the IPv4 datagram in bytes. Using this field and the IHL field, we know where the data portion of the datagram starts, and its length.Because this is a 16-bit field, the maximum size of an IPv4 datagram (including header) is 65,535 bytes.
6. Identification field: indentify each datagram sent by an IPv4 host. To ensure that the fragments of one datagram are not confused with those of another,the sending host normally increments an internal counter by 1 each time a datagram is sent (from one of its IP addresses) and copies the value of the counter into the IPv4 Identification field.
7. Time-to-Live field (TTL): sets an upper limit on the number of routers through which a datagram can pass.It is initialized by the sender to some value (64 is recommended) and decremented by 1 by every router that forwards the datagram. When this field reaches 0, the datagram is thrown away, and the sender is notified with an ICMP message
8. Protocol field: contains a number indicating the type of data found in the payload portion of the datagram. The most common values are 17 (for UDP) and 6 (for TCP).
9. Header Checksum field: calculated over the IPv4 header only
10. Options: IP supports a number of options that may be selected on a per-datagram basis. Most of the standardized options are rarely or never used in the Internet today.

![ipv6 header](https://s1.ax1x.com/2020/03/26/8x0uq0.png)

### IP Forwarding

The IP layer has some information in memory, usually called a routing table or forwarding table, which it searches each time it receives a datagram to send. When a datagram is received from a network interface, IP first checks if the destination IP address is one of its own IP addresses (i.e., one of the IP addresses associated with one of its network interfaces) or some other address for which it should receive traffic such as an IP broadcast or multicast address. If so, the datagram is delivered to the protocol module specified by the Protocol field in the IPv4 header or Next Header field in the IPv6 header. If the datagram is not destined for one of the IP addresses being used locally by the IP module, then (1) if the IP layer was configured to act as a router, the datagram is forwarded (that is, handled as an outgoing datagram; or (2) the datagram is silently discarded. Under some circumstances (e.g., no route is known in case 1), an ICMP message may be sent back to the source indicating an error condition.

![ip forward](https://s1.ax1x.com/2020/03/26/8xTIte.png)

Forwarding Table

1. Destination: This contains a 32-bit field (or 128-bit field for IPv6) used for matching the result of a masking operation (see the next bulleted item). The destination can be as simple as zero, for a “default route” covering all destinations, or as long as the full length of an IP address, in the case of a “host route” that describes only a single destination
2. Mask: This contains a 32-bit field (128-bit field for IPv6) applied as a bitwise AND mask to the destination IP address of a datagram being looked up in the forwarding table. The masked result is compared with the set of destinations in the forwarding table entries.
3. Next-hop: This contains the 32-bit IPv4 address or 128-bit IPv6 address of the next IP entity (router or host) to which the datagram should be sent. The next-hop entity is typically on a network shared with the system performing the forwarding lookup, meaning the two share the same network prefix
4. Interface: This contains an identifier used by the IP layer to reference the network interface that should be used to send the datagram to its next hop.

IP Forwarding Actions

1. Search the table for all entries for which the following property holds:$(D ^ m_j) = d_j$, where $m_j$ is the value of the mask field associated with the forwarding entry $e_j$ having index $j$, and $d_j$ is the value of the destination fieldassociated with $e_j$. This means that the destination IP address $D$ is bitwise ANDed with the mask in each forwarding table entry $(m_j)$, and the result is compared against the destination in the same forwarding table entry $(d_j)$. If the property holds, the entry ($e_j$ here) is a “match” for the destination IP address. When a match happens, the algorithm notes the entry index ($j$ here) and how many bits in the mask mj were set to 1. The more bits set to 1, the “better” the match. (longest prefix match algorithm)
2. The best matching entry $e_k$ (i.e., the one with the largest number of 1 bits in its mask $m_k$) is selected, and its next-hop field $n_k$ is used as the next-hop IP address in forwarding the datagram.
3. If no matches in the forwarding table are found, the datagram is undeliverable. If the undeliverable datagram was generated locally (on this host), a “host unreachable” error is normally returned to the application that generated the datagram. On a router, an ICMP message is normally sent back to the host that sent the datagram
4. In some circumstances, more than one entry may match an equal number of 1 bits. This can happen, for example, when more than one default route is available (e.g., when attached to more than one ISP, called multihoming). The end-system behavior in such cases is not set by standards and is instead specific to the operating system’s protocol implementation. A common behavior is for the system to simply choose the first match. More sophisticated systems may attempt to load-balance or split traffic across the multiple routes

## ICMPv4 and ICMPv6: Internet Control Message Protocol


## System Configuration: DHCP and Autoconfiguration

## Firewalls and Network Address Translation (NAT)